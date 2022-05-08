const keyboard = {

  KEYS : {
    ENG : 
        [['`',"Backquote"], ['1','Digit1'], ['2','Digit2'], ['3','Digit3'], ['4','Digit4'], ['5','Digit5'], ['6','Digit6'], ['7','Digit7'],
    ['8','Digit8'], ['9','Digit9'], ['0','Digit0'], ['-','Minus'],  ['=','Equal'], ['Backspace','Backspace'],
    ['Tab','Tab'], ['q','KeyQ'], ['w','KeyW'], ['e','KeyE'], ['r','KeyR'], ['t','KeyT'], ['y','KeyY'], ['u','KeyU'], ['i','KeyI'], ['o','KeyO'],
    ['p','KeyP'], ['[','BracketLeft'], [']','BracketRight'], [ '\\','Backslash'], ['Del','NumpadDecimal'],
    ['CapsLock','CapsLock'], ['a','KeyA'], ['s','KeyS'], ['d','KeyD'], ['f','KeyF'], ['g','KeyG'], ['h','KeyH'], ['j','KeyJ'], ['k','KeyK'],
    ['l','KeyL'], [';','Semicolon'], ["'",'Quote'], ['Enter','Enter'],
    ['Shift','ShiftLeft'], ['z','KeyZ'], ['x','KeyX'], ['c','KeyC'], ['v','KeyV'], ['b','KeyB'], ['n','KeyN'], ['m','KeyM'],
    [',','Comma'], ['.','Period'], ['/','Slash'], ['▲','ArrowUp'], ['Shift','ShiftRight'],
    ['Ctrl','ControlLeft'], ['Win','MetaLeft'], ['Alt','AltLeft'], ['Space','Space'], ['Alt','AltRight'], ['Ctrl','ControlLeft'],
     ['◄','ArrowLeft'], ['▼','ArrowDown'], ['►','ArrowRight'], ['Eng', 'Eng']],

    RU : []
  },
   
    
  elements: {
    keysContainer: null,
    keys: []
  },


  properties: {
    capsLock: false,
  },


  init() {

    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.textareaContainer = document.createElement('div');
    this.elements.textarea = document.createElement('textarea');

    this.elements.main.classList.add('wrapper');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.textareaContainer.classList.add('content');
    this.elements.textarea.setAttribute("cols", "95");
    this.elements.textarea.setAttribute("rows", "10");
    this.elements.textarea.setAttribute("disabled", "disabled");

    this.elements.keys = this.elements.keysContainer.children;
    console.log(this.elements.textarea.innerHTML)

    this.elements.keysContainer.append(this.createKeys())
    this.elements.main.prepend(this.elements.keysContainer)
    this.elements.textareaContainer.prepend(this.elements.textarea);
    this.elements.main.prepend(this.elements.textareaContainer)
    document.body.prepend(this.elements.main)
  },

  
  createKeys() {
    const {ENG} = this.KEYS;
  
    ENG.forEach(key => {
      const keyElement = document.createElement('button');
      keyElement.classList.add('button');
      keyElement.setAttribute('keyCode', key[1]);

      switch (key[0]) {
        case 'Backspace' :
          keyElement.classList.add('backspace');
          keyElement.textContent = key[0];

          keyElement.addEventListener('click', ()=> {
            this.elements.textarea.innerHTML = this.elements.textarea.innerHTML.substring(0, this.elements.textarea.innerHTML.length - 1);
          })
          break;

      case 'CapsLock' :
        keyElement.classList.add('capslock');
        keyElement.textContent = key[0];

        keyElement.addEventListener('click', ()=> {
          this.toggleCapsLock()
        })
        break;

      case 'Enter' :
        keyElement.classList.add('enter');
        keyElement.textContent = key[0];

        keyElement.addEventListener('click', ()=> {
          this.elements.textarea.innerHTML += '\n';
        })
        break;

      case 'Space' :
        keyElement.classList.add('space');
        keyElement.textContent = key[0];

        keyElement.addEventListener('click', ()=> {
          this.elements.textarea.innerHTML += ' ';
        })
        break;
      
      case 'Shift' : 
        keyElement.classList.add('shift');
        keyElement.textContent = key[0];    
        keyElement.addEventListener('click', (e)=> {
          this.elements.textarea.innerHTML += 'shift';
          console.log(e)
        })
        break;

        default:
          keyElement.textContent = key[0].toLowerCase();
          
          keyElement.addEventListener("click", () => {
            this.elements.textarea.innerHTML += this.properties.capsLock ? key[0].toUpperCase() : key[0].toLowerCase();
            
          });
          break;
      }
      
      return this.elements.keysContainer.append(keyElement)
    });
  
  },


  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      
        if (key.textContent.length <= 1)
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  },


  eventKeyboard() {
    const elementsKeys = [...this.elements.keys];

    window.addEventListener('keydown', (e) => {  
      const keyboardKey = e.key ;
      console.log(e)

      elementsKeys.forEach(key => {
        const keyAttribute = key.getAttribute('keyCode')
       
        if (key.textContent == keyboardKey) {
          key.classList.add('active')
          
          switch (keyboardKey) {
            case 'Backspace' :
              this.elements.textarea.innerHTML = this.elements.textarea.innerHTML.substring(0, this.elements.textarea.innerHTML.length - 1);
              break;

            case 'CapsLock' :
              this.toggleCapsLock()
              break;

            case 'Enter' :
              this.elements.textarea.innerHTML += '\n';
              break;

            case 'Space' :
              this.elements.textarea.innerHTML += " ";
              break;

            case 'del' : 
              this.elements.textarea.innerHTML = "";
              break;

            default :
            
            this.elements.textarea.innerHTML += keyboardKey;
          }
          
        }
      });


    window.addEventListener('keyup', (e) => {
      const keyboardKey = e.key;
      console.log(e.code)
      elementsKeys.forEach(key => {
        if (key.textContent == keyboardKey) {
          key.classList.remove('active');
        }
      })
    })
  })

  }
}

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init()
  keyboard.eventKeyboard()
})


