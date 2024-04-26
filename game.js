//Defining the elements in the game
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//Setting the state the user is in when they first start the game (it is empty when they start)
let state = {}

//Starting the game with empty state and the first text
function startGame() {
    state = {}
    showTextNode(1)

}

//The main text funstion which pulls the next ID
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id ===
        textNodeIndex)
        textElement.innerHTML = textNode.text
        
        // Replace the ad placeholder with an ad
        fetch('http://localhost:3000/api/getAd')
        .then(response => response.json())
        .then(ad => {
          
        document.getElementsByClassName('ad-placeholder')[0].innerText = ad[0].text
        })
       
        //The buttons are hidden to have only the needed ones appear 
        while (optionButtonsElement.firstChild) {
            optionButtonsElement.removeChild(optionButtonsElement.firstChild)
        }

        //to show the buttons with their new text
  textNode.options.forEach(option => {
    if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
    }
})

}
 
function showOption(option) {
    return option.requiredState == null ||  option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText

    //For restarting the game incase the ID goes -1
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

//Defining the text, states (of the objects you collext), and new IDs
const textNodes = [
    {
        id: 1, 
        text: 'you wake up in <span class="ad-placeholder"> the place </span> without your wallet but some coins on the floor next to you',
        options: [
            {
                text: 'Grab the coins and get up', 
                setState: { someCoins: true }, 
                nextText: 2
            }, 

            {
                text: 'Get up and leave the coins',
                nextText: 2
            }
        ]
    }, 

    {
        id:2,
        text: 'You walk out and decide to walk toward the small village and see a little stall on the side of the road',
        options: [
            {
            text: 'Purchase a sword',
            requiredState: (currentState) => currentState.someCoins,
            setState: { someCoins: false, sword: true},
            nextText:3
             },
            {
            text: 'Purchase a shield',
            requiredState: (currentState) => currentState.someCoins,
            setState: { someCoins: false, shield: true},
            nextText:3
            },
            {
                text: 'Walk past the stall',
                nextText:3
            }
            
         ]
    },

    {
        id:3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle',
        options: [
            {
            text: 'Explore the castle',
            nextText:4
             },
            {
            text: 'Find a room to sleep at in the town',
            nextText:5
            },
            {
                text: 'Find some Hay in the stable to sleep in ',
                nextText:6
            }
         ]
    },

    {
        id:4,
        text: 'You are tired going into the castle and fall alseep, a horrid moster comes and kills you while you sleep',
        options: [
            {
            text: 'Restart', 
            nextText: -1,
            }
        ]
    }, 


    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
          {
            text: 'Explore the castle',
            nextText: 7
          }
        ]
      },
      {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
          {
            text: 'Try to run',
            nextText: 8
          },
          {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
          },
          {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
          },
          {
            text: 'Throw the blue goo at it',
            requiredState: (currentState) => currentState.blueGoo,
            nextText: 11
          }
        ]
      },
      {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
          {
            text: 'Congratulations. Play Again.',
            nextText: -1
          }
        ]
      }
    ]

startGame()