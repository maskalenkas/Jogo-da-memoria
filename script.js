const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false


function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return /* Bloqueando o clique duplo */

    this.classList.add('flip')
    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return;
    }

    secondCard = this
    hasFlippedCard = false
    checkForMatch()
}

/* 1 */
cards.forEach((card) => {
    // Vai acionar um evento de clique e vai ativar a função flipCard
    card.addEventListener('click', flipCard)
})


/* Checando para ver se as cartas são iguais */
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        desableCards()
        return;
    }

    unflipCards()
}

/* Desabilitando as cartas */
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

/* Desvirando as cartas caso elas sejam diferentes, e aplicando um lock para não desvirar 3 cartas ao mesmo tempo */
function unflipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

/* Deixando as cartas aleatorias e fazendo iniciar assim que a pagina carregar */
(
    function shuffle() {
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12)
            card.style.order = randomPosition
        })
    })()

