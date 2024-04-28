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

//Defining the text, states (of the objects you collexc), and new IDs
const textNodes = [
    {
        id: 1, 
        text: 'you wake up in  the place </span> without your wallet but some coins on the floor next to you',
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
        text: 'You walk out and decide to walk toward the small village and see a <span class="ad-placeholder"> little stall </span>  on the side of the road',
        options: [
            {
            text: 'Purchase a drink',
            requiredState: (currentState) => currentState.someCoins,
            setState: { someCoins: false, drink: true},
            nextText:3
             },
            {
            text: 'Purchase a snack',
            requiredState: (currentState) => currentState.someCoins,
            setState: { someCoins: false, snack: true},
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
        text: 'After leaving the merchant you start to feel tired and walk past a Gym',
        options: [
            {
            text: 'Go inside the gym',
            nextText:4
             },
            {
            text: 'Find a room to sleep at in a hotel',
            nextText:5
            },
            {
                text: 'Go snooze in a starbucks',
                nextText:6
            }
         ]
    },

    {
        id:4,
        text: 'You are tired going into the gym and fall alseep, its while you are on a pelaton and you die from a awkward fall',
        options: [
            {
            text: 'Restart', 
            nextText: -1,
            }
        ]
    }, 


    {
        id: 5,
        text: 'Without any money to buy a room you lie about paying the next day. The next morning the hotel manager argues with you and calls the guards.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 6,
        text: 'You wake up well rested and full of energy ready to go back to the gym.',
        options: [
          {
            text: 'Go back to gym',
            nextText: 7
          }
        ]
      },
      {
        id: 7,
        text: 'When you enter the Gym a trainer approaches you',
        options: [
          {
            text: 'Try to move away',
            nextText: 8
          },
          {
            text: 'Take a sip of your drink',
            requiredState: (currentState) => currentState.drink,
            nextText: 9
          },
          {
            text: 'Nervously take a bite of your snack',
            requiredState: (currentState) => currentState.snack,
            nextText: 10
          },
          {
            text: 'Fall down and drop all your coins on the floor',
            requiredState: (currentState) => currentState.fewCoins,
            nextText: 11
          }
        ]
      },
      {
        id: 8,
        text: 'You overthink about the trainer considering you rude and leave the gym',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 9,
        text: 'The trainer scolds you for drinking too much before a workout, you ignore them and get stomach aches while exercising',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 10,
        text:  'The trainer judges you, and you leave in shame',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 11,
        text: 'You fall down and your coins roll away. You see a person, asleep in the gym, pick them up',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      }
    ]

startGame()
