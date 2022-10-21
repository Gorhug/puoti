import type { Actions } from './$types'
import { processForm } from '$lib/lomake'
import { Remarkable } from 'remarkable'
import { transport } from '$lib/server/email'
import { invalid } from '@sveltejs/kit';


const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


const helmiEmail = 'quiverth@gmail.com'

export const actions: Actions = {
  default: async ({ request }) => {
    const required = ['email', 'aihe', 'viesti']
    const optional = ['nimi', 'uutiskirje']
    const expected = [...required, ...optional]


    const form = processForm(await request.formData(), required, expected)
    const data = form.entries
    const missing = form.missing
    let errors: string[] = []
    const email = data.get('email') ?? ''

    if (email && !emailRegex.test(email)) {
      errors.push(`Virheellinen email-osoite`)
    }

    if (missing.size || errors.length) {
  
      return invalid(400, { error: 'Puuttuvia tai virheellisiä tietoja', missing, errors, data })
    }

    
    const nimi = data.get('nimi')?? ''
    const md = new Remarkable()
    const viesti = data.get('viesti') ?? ''
    const info = await transport.sendMail({
      from: `Kirjontastudio Helmi lomakekäsittelijä <${helmiEmail}>`, // sender address
      to: `Kirjontastudio Helmi <${helmiEmail}>`, // list of receivers
      subject: data.get('aihe') ?? 'Virhetilanne???', // Subject line
      text: viesti, // plain text body
      html: md.render(viesti), // html body
      replyTo: {
        name: nimi,
        address: email
      }
    });
    
    return { success: true }
  }
};