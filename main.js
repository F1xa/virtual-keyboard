const keyboard = {

  KEYS : {
    ENG : 
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '◄', '▼', '►', 'Eng'],

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


    this.elements.keys = this.elements.keysContainer.children;
    console.log(this.elements.textarea.innerHTML)

    this.elements.keysContainer.append(this.createKeys())
    this.elements.main.prepend(this.elements.keysContainer)
    this.elements.textareaContainer.prepend(this.elements.textarea);
    this.elements.main.prepend(this.elements.textareaContainer)
    document.body.prepend(this.elements.main)
  },

  createKeys() {

    this.KEYS.ENG.forEach(key => {
      const keyElement = document.createElement('button');
      
      keyElement.classList.add('button');

      switch (key) {
        case 'Backspace' :
          keyElement.classList.add('backspace');
          keyElement.textContent = key;

          keyElement.addEventListener('click', ()=> {
            this.elements.textarea.innerHTML = this.elements.textarea.innerHTML.substring(0, this.elements.textarea.innerHTML.length - 1);
            this.triggerEvent("oninput");
          })
          break;

      case 'CapsLock' :
        keyElement.classList.add('capslock');
        keyElement.textContent = key;

        keyElement.addEventListener('click', ()=> {
          this.toggleCapsLock()
        })
        break;

      case 'Enter' :
        keyElement.classList.add('enter');
        keyElement.textContent = key;

        keyElement.addEventListener('click', ()=> {
          this.elements.textarea.innerHTML += '\n';
        })
        break;

      case 'Space' :
        keyElement.classList.add('space');
        keyElement.textContent = key;

        keyElement.addEventListener('click', ()=> {
          this.elements.textarea.innerHTML += ' ';
        })
        break;
      
      case 'Shift' : 
        keyElement.classList.add('shift');
        keyElement.textContent = key;    
        keyElement.addEventListener('click', (e)=> {
          this.elements.textarea.innerHTML += 'shift';
          console.log(e)
        })
        break;

        default:
          keyElement.textContent = key.toLowerCase();
          
          keyElement.addEventListener("click", () => {
            this.elements.textarea.innerHTML += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            
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

}


window.addEventListener("DOMContentLoaded", () => {
  keyboard.init()
})