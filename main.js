$(document).ready(function() {
    //invio del messaggio
    //intercetto il click

    $('.right-footer-icon.f-right').click(function() {
        // recupero il contenuto delL'input del messaggio
        invio_messaggio()
        // var testo_messaggio = $('.new-message-inputs').val();
        // if (testo_messaggio.length != 0) {
        //     // clono il template del messaggio
        //     var nuovo_messaggio = $('.template .message').clone();
        //
        //     //inserisco nel giusto span il teto del messaggio
        //     nuovo_messaggio.children('.message-text').text(testo_messaggio);
        //
        //     // aggiungo al div .message la classe sent
        //
        //     nuovo_messaggio.addClass('sent');
        //     //inserisco il messaggio all'interno del container
        //
        //     $('.right-messages.active').append(nuovo_messaggio);
        //
        //     //resetto l'input con una stringa vuota
        //
        //     $('.new-message-inputs').val('');
        //
        // }
    });

    //intercetto il tasto INVIO
    $('.new-message-inputs').keypress(function(event) {
        console.log(event);
        //controllo se il tasto digitato corrisponde al tasto invio
        if (event.which == 13) {
            invio_messaggio()
            // //recupero il contenuto dell'input del nuovo_messaggio
            // var testo_messaggio = $('.new-message-inputs').val();
            // if(testo_messaggio.length != 0) {
            // // clono il template del messaggio
            // var nuovo_messaggio = $('.template .message').clone();
            //
            // //inserisco nel giusto span il teto del messaggio
            // nuovo_messaggio.children('.message-text').text(testo_messaggio);
            //
            // // aggiungo al div .message la classe sent
            //
            // nuovo_messaggio.addClass('sent');
            // //inserisco il messaggio all'interno del container
            //
            // $('.right-messages.active').append(nuovo_messaggio) ;
            //
            // //resetto l'input con una stringa vuota
            //
            // $('.new-message-inputs').val('');
        }
    })

    //SNELLISCO INSERENDO UNA FUNZIONE



// intercetto il focus nell'area di testo del messaggio
$('.new-message-inputs').focus(function() {
    // <i class = 'fas fa-paper-plane'></i>
    $('.right-footer-icon.f-right i').toggleClass('fa fa-microphone fas fa-paper-plane');
    });
    //POTREI CONCATENARE (NB TOGLI PUNTO E VIRGOLA DA FUNZIONE PRECEDENTE)
    // .blur(function() {
    //     // <i class = 'fas fa-paper-plane'></i>
    //     $('.right-footer-icon.f-right i').toggleClass('fa fa-microphone fas fa-paper-plane');

// intercetto l'uscita del focus dall'area di testo del messaggio
$('.new-message-inputs').blur(function() {
    // <i class = 'fas fa-paper-plane'></i>
    $('.right-footer-icon.f-right i').toggleClass('fa fa-microphone fas fa-paper-plane');
});

//quando digita qualcosa
//Keyup avviene quando è stato digitato il testo (quando utente rilascia il tasto), keydown e keypress non sono quindi idonei
// NB NON IDONEO $('#contacts-filter').keypress(function(){
//posso scrivere input davanti a #contacts-filter
$('input#contacts-filter').keyup(cerca_contatti);

 //intercetto il click sul pulsante di ricerca cerca_contatti
$('.search-label').click(cerca_contatti);


function invio_messaggio() {
    var testo_messaggio = $('.new-message-inputs').val();
    if (testo_messaggio.length != 0) {
        // clono il template del messaggio
        var nuovo_messaggio = $('.template .message').clone();

        //inserisco nel giusto span il teto del messaggio
        nuovo_messaggio.children('.message-text').text(testo_messaggio);

        // aggiungo al div .message la classe sent

        nuovo_messaggio.addClass('sent');
        //inserisco il messaggio all'interno del container

        $('.right-messages.active').append(nuovo_messaggio);

        //resetto l'input con una stringa vuota

        $('.new-message-inputs').val('');
    }

        //risposta del pc con scritto 'ok'
        setTimeout(risposta_computer,1000);
};

$('.contact').click(function() {
    var questa_conversazione = $(this).attr('data-codice');
    $('.contact').removeClass('active');
    $(this).addClass('active');
    $('.right-messages').removeClass('active');
    $('.right-messages[data-codice="' + questa_conversazione + '"]').addClass('active');
})

function risposta_computer() {
    //clono il template del invio_messaggio
    var messaggio_risposta  = $('.template .message').clone();
    //inserisco nel giusto span il testo del messaggio
    messaggio_risposta.children('.message-text').text('ok');
    //aggiungo al div .message la classe received
    messaggio_risposta.addClass('received');
    // inserisco il messaggio all'interno del container
    $('.right-messages.active').append(messaggio_risposta);

}

function cerca_contatti() {
    //vado a vedere cos'hai scritto (recupero il testo digitato nella ricerca)
    //IL this AL POSTO DI input#contacts-filter CHE POTEVO USARE SU FUNZIONE ANONIMA COSI' NON FUNZIONA PIU' (DEVO INTERCETTARE L'input)
    var testo_ricerca = $('input#contacts-filter').val();
    if(testo_ricerca.length != 0) {
    //vado a vedere per ognuno di essi se corrisponde a un elemento della mia lista (funzione.each mi aiuta)
    //quelli che non corrispondono li devo nascondere
     $('div.contact').each(function(){
         //find mi permette di cercare un elemento figlio a qualsiasi livello
         //val si usa sull'input, text mi prende il contenuto testuale
         var nome_contatto = $(this).find('.contact-name').text();
         //trasformo in minuscolo entrambe le stringhe
         testo_ricerca = testo_ricerca.toLowerCase();
         nome_contatto = nome_contatto.toLowerCase();
         // if (testo_ricerca == nome_contatto) { VECCHIA VERSIONE (CON .includes PIU' FINE)
         // ALTRA VERSIONE: if(nome_contatto.indexOf(testo_ricerca >-1 (OPPURE != -1)))
         //CON indexOf VERIFICA L'INDICE DELLE MIE LETTERE, CHE DEVE PARTIRE DA ZERO
         if (nome_contatto.includes(testo_ricerca)) {
         //il nome corrisponde al testo ricercato? Se si visulizzo il contatto corrispondente
         $(this).show();
     } else {
         //il nome viene nascosto
         $(this).hide();
     }
    });
    } else {
        // se l'utente non ha digitato nulla nella ricerca => visualizza tutti i contatti
        $('div.contact').show();
    }
}
//il form deve inviare un invio_messaggio
//compare un messaggio a schermo
//compare dall'altra parte un messaggio di risposta
// = uso un template (creo una scatola vuota all'interno dell'HTML)

//gestisco il click tramite ;
//il click per me è una struttura che farà partire delle funzioni (es invia messaggio) e dentro ci metterò il clone che stavo dicendo prima (prima lo clono poi se faccio console log del clone ci rendiamo conto di cosa si parla quando ci ha detto il DOM (trasposizione in oggetto del vostro html) chiamo con inner.html a quel DOM)

//lista contatti la posso creare su un array con i nomi. Ci mettimao i dati dentro al template. Chiamo il template che ho creato col clone, acchiappo il div e ci metto il testo dentro. .padre.children.figlio, quindi ci append il codice che avevo generato

//funzione da zero per ricezione e l'hanno messo all'interno di setInterval ma non va bene...


});
