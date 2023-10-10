
# Youtube Chat Widget Editor





[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)




## Setup
1. Atur variabel yang digunakan pada CSS pada file field.json
```bash
  ./config/data/field.json
```

isi file field.json:
```json
{
    "nameFontSize": {
        "id": "name-font-size",
        "css": "--name-font-size",
        "type": "number",
        "label": "Name Font Size",
        "group": "Chat Settings",
        "sub-group": "none"
    },
    "messageFontSize": {
        "id": "message-font-size",
        "css": "--message-font-size",
        "type": "number",
        "label": "Message Font Size",
        "group": "Chat Settings",
        "sub-group": "none"
    },
    "ownerNameColor": {
        "id": "owner-name-color",
        "css": "--owner-name-color",
        "type": "colorPicker",
        "label": "Name Color",
        "group": "Chat Settings",
        "sub-group": "Streamer"
    },
    ...
}
```

key `nameFontSize`, `messageFontSize`, dan `ownerNameColor` berfungsi sebagai unique key yang berisikan value masing-masing variabel CSS.

Masing-masing unique key tersebut berisikan atribut seperti `id`, `css`, `type`, `label`, `group`, `sub-group`.

- atribut `id` berfungsi sebagai id yang akan di set pada id input(color/number/text). pastikan value `id` sama dengan value `css` tanpa `--`.

- atribut `css` berfungsi sebagai key untuk mengakses variable CSS agar dapat dilakukan modifikasi. pastikan value dari atribut `css` ini sama dengan yang ada di file `style.css` dan `css.js`.

- atribut `type` berfungsi untuk mendefinisikan tipe inputan untuk variabel tersebut. saat ini hanya terdapat 2 tipe inputan yaitu `colorPicker` dan `number`.

- atribut `label` berfungsi untuk mendefinisikan label untuk input.

- atribut `group` berfungsi untuk membuat grouping atau pengelompokan jenis variabel seperti `Chat Settings`, `Membership Settings`, dan `Superchat Settings`.

- atribut `sub-group` berfungsi untuk membuat sub-group atau sub pengelompokan berdasarkan parent group pada atribut `group`. jika `group` tidak memiliki `sub-group` maka valuenya harus `"none"`

2. Isi file `style.css` pada `./config/css/style.css` dengan CSS hasil customize.

contoh isi file style.css
```CSS
@import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

:root {
  /* chat */
  /* owner/streamer */
  --owner-name-color: #000000;
  --owner-bg-name-color: #FFC774;
  --owner-message-color: #281E14;
  --owner-bg-message-color: #FFE9DD;
  --owner-bottom-shadow-color: #D19B7D;
  --owner-shadow-color: #FFE9DD;

...
```

pastikan setiap nama variabel sama dengan yang digunakan pada file `field.json`

3. Isi file `css.js` pada `./config/data/css.js` dengan CSS hasil customize.

pastikan memasukkan css tersebut ke dalam variabel `var styleChat`

contoh isi `css.js`
```javascript
var styleChat = 
    `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

    :root {
    /* chat */
    /* owner/streamer */
    --owner-name-color: #ffffff;
    --owner-bg-name-color: #645D5A;
    --owner-message-color: #1F1B1C;
    --owner-bg-message-color: #FFF6EB;
    --decoration-color-owner: #fec175;

...
```

pastikan setiap nama variabel sama dengan yang ada pada file `style.css` dan `field.json`


4. Pada file app.html terdapat internal javascript pada bagian bawah.

```javascript
// replace 'test' with unique identifier for each project
var uniqueId = 'test'
```

ubah bagian `uniqueId` dengan kode unik untuk setiap project

5. (Optional)
Untuk mengubah warna default dari background editor, ubah value variabel `--editor-bg-color: #9b9b9b;` yang ada pada file `main.css`

    
## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.


## License

[MIT](https://choosealicense.com/licenses/mit/)

