
# Youtube Chat Widget Editor





[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)




## Setup
#### 1. Atur variable CSS yang sudah di customize agar memiliki identifier untuk masing-masing bagian.
Pisahkan perbagian seperti `owner/streamer`, `moderator`, `member`, dan seterusnya.
penamaan perbagian mengikuti rules `/* part */` `/* end-part */` :
- owner (untuk Streamer atau Channel Owner)
- moderator (untuk Moderator)
- member (untuk Member)
- general (untuk General Viewers)
- membership (untuk Membership dan Gift)
- sc (untuk Superchat dan SuperStricker)

contoh:
```CSS
:root {
  /* owner */
  --owner-name-color: #000000;
  --owner-bg-name-color: #FFC774;
  --owner-message-color: #281E14;
  --owner-bg-message-color: #FFE9DD;
  --owner-bottom-shadow-color: #D19B7D;
  --owner-shadow-color: #FFE9DD;
  /* end-owner */

  /* moderator */
  --moderator-name-color: #ffffff;
  --moderator-bg-name-color: #748AFF;
  --moderator-message-color: #281E14;
  --moderator-bg-message-color: #FFE9DD;
  --moderator-bottom-shadow-color: #D19B7D;
  --moderator-shadow-color: #FFE9DD;
  /* end-moderator */

  /* member */
  --member-name-color: #000000;
  --member-bg-name-color: #88CC88;
  --member-message-color: #281E14;
  --member-bg-message-color: #FFE9DD;
  --member-bottom-shadow-color: #D19B7D;
  --member-shadow-color: #FFE9DD;
  /* end-member */

  /* general */
  --general-name-color: #000000;
  --general-bg-name-color: #FF9E74;
  --general-message-color: #281E14;
  --general-bg-message-color: #FFE9DD;
  --general-bottom-shadow-color: #D19B7D;
  --general-shadow-color: #FFE9DD;
  /* end-general */

  /* membership */
  --membership-name-color: #281E14;
  --membership-subtext-color: #281E14;
  --membership-other-color: #281E14;
  --membership-message-color: #281E14;
  --membership-bg-color: #FFE9DD;
  --membership-bg-name-color: #FF9E74;
  --membership-bottom-shadow-color: #D19B7D;
  --membership-shadow-color: #FFE9DD;
  /* end-membership */

  /* sc */
  --sc-name-color: #281E14;
  --sc-background-color: #FFE9DD;
  --sc-bottom-shadow-color: #D19B7D;
  --sc-shadow-color: #FFE9DD;
  /* end-sc */

  /* chat-font-size */
  --name-font-size: 14px;
  --message-font-size: 16px;
  /* end-chat-font-size */

  /* sc-font-size */
  --sc-name-font-size: 16px;
  --sc-amount-font-size: 24px;
  --sc-message-font-size: 18px;
  /* end-sc-font-size */

  /* membership-font-size */
  --membership-name-font-size: 16px;
  --membership-subtext-font-size: 18px;
  --membership-other-font-size: 14px;
  --membership-message-font-size: 18px;
  /* end-membership-font-size */
}
```

untuk penamaan yang tidak ada dalam rules atau ingin menambahkan penamaan baru, harap memperhatikan pada file `utilities.js` pada `./config/js/utilities.js` pada fungsi `loadWidgetStyle()`
```javascript
function loadWidgetStyle(){
    let ownerStyle = getStyle(styleChat, "/* owner */","/* end-owner */");
    let moderatorStyle = getStyle(styleChat, "/* moderator */","/* end-moderator */");
    let memberStyle = getStyle(styleChat, "/* member */","/* end-member */");
    let generalStyle = getStyle(styleChat, "/* general */","/* end-general */");
    let membershipStyle = getStyle(styleChat, "/* membership */","/* end-membership */");
    let scStyle = getStyle(styleChat, "/* sc */","/* end-sc */");
    let chatFontSizeStyle = getStyle(styleChat, "/* chat-font-size */","/* end-chat-font-size */");
    let scFontSizeStyle = getStyle(styleChat, "/* sc-font-size */","/* end-sc-font-size */");
    let membershipFontSizeStyle = getStyle(styleChat, "/* membership-font-size */","/* end-membership-font-size */");

    generateStyleData(chatFontSizeStyle, "Chat Settings", "none", "number")
    generateStyleData(ownerStyle, "Chat Settings", "Streamer", "colorPicker")
    generateStyleData(moderatorStyle, "Chat Settings", "Moderator", "colorPicker")
    generateStyleData(memberStyle, "Chat Settings", "Member", "colorPicker")
    generateStyleData(generalStyle, "Chat Settings", "General", "colorPicker")

    generateStyleData(membershipFontSizeStyle, "Membership Settings", "none", "number")
    generateStyleData(membershipStyle, "Membership Settings", "none", "colorPicker")
    
    generateStyleData(scFontSizeStyle, "Superchat Settings", "none", "number")
    generateStyleData(scStyle, "Superchat Settings", "none", "colorPicker")
}
```
sesuaikan pada fungsi `loadWidgetStyle` untuk setiap bagian-bagian yang telah dipisahkan pada CSS hasil customize.

fungsi `generateStyleData` menerima parameter `generateStyleData(styles, group, subgroup, type)`. fungsi ini akan melakukan generate data dengan tipe json dengan unique key berasal dari nama tiap variable css.

Masing-masing unique key tersebut berisikan atribut seperti `id`, `css`, `type`, `label`, `group`, `sub-group`.

- atribut `id` berfungsi sebagai id yang akan di set pada id input(color/number/text). `id` akan secara otomatis dibuat berdasarkan nama variable css tanpa `"--"`.

- atribut `css` berfungsi sebagai key untuk mengakses variable CSS agar dapat dilakukan modifikasi. `css` akan otomatis dibuat berdasarkan nama variable.

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
  /* owner */
  --owner-name-color: #000000;
  --owner-bg-name-color: #FFC774;
  --owner-message-color: #281E14;
  --owner-bg-message-color: #FFE9DD;
  --owner-bottom-shadow-color: #D19B7D;
  --owner-shadow-color: #FFE9DD;

...
```

3. Isi file `css.js` pada `./config/data/css.js` dengan CSS hasil customize.

pastikan memasukkan css tersebut ke dalam variabel `var styleChat`

contoh isi `css.js`
```javascript
var styleChat = 
    `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

    :root {
    /* owner */
    --owner-name-color: #ffffff;
    --owner-bg-name-color: #645D5A;
    --owner-message-color: #1F1B1C;
    --owner-bg-message-color: #FFF6EB;
    --decoration-color-owner: #fec175;

...
```

pastikan setiap nama variabel sama dengan yang ada pada file `style.css`


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

