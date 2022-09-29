<svelte:head>
    <title>Ota yhteyttä - Neilikka</title>
</svelte:head>

<form method="post">
	<label for="nimi">Nimi:</label>
	<input type="text" id="nimi" name="nimi" />
	<label for="email">Sähköpostiosoite:</label>
	<div class="req"><input type="email" id="email" name="email" required /><span /></div>
	<label for="aihe">Aihe:</label>
	<div class="req"><input list="aiheet" id="aihe" name="aihe" required /><span /></div>
	<datalist id="aiheet">
		<option value="Kysymys tuotteista" /><option value="Tilaus" /><option
			value="Yhteydenottopyyntö"
		/></datalist
	>
	<label for="viesti">Viesti:</label>
  <div class="req">
	<textarea id="viesti" name="viesti" required /><span /></div>

	<div id="tilausnappi">
		<input type="checkbox" id="uutiskirje" name="uutiskirje" />
		<label for="uutiskirje" id="uutiskirjeteksti"
			>Haluan tilata Puutarhaliike Neilikan uutiskirjeen</label
		>
	</div>
	<input type="submit" id="submit" value="Lähetä" />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	input:invalid + span::after, textarea:invalid + span::after {
		content: '❗';
		color: red;
		padding-left: 5px;
	}

	input:valid + span::after {
		color: green;
		content: '✓';
		padding-left: 5px;
	}
  .req {
    display: grid;
    grid-template-columns: 90% 10%;
  }
  textarea {
    height: 10em;
  }
</style>
