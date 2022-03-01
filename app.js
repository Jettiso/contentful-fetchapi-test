let container = document.querySelector('.container');

const client = contentful.createClient({
    space: "y3wfgo8gqb7l",
    accessToken: "o42RXA4dScgdXfWytp5iS0iy88F-jSQ1xzfshM39prQ",
});

async function getContent() {
    const contentful = await client.getEntries({
        content_type: "food",
    });

    let items = contentful.items;

    items = items.map((item) => {
        const fields = item.fields;
        // img
        const img = fields.img;
        const imgFields = img.fields;
        const imgFile = imgFields.file;
        const imgUrl = imgFile.url;
        //name
        const name = fields.name;
        const prize = fields.prize;

        return { name, prize, imgUrl };
    });

    return items;

    
}

function displayProducts(params) {
    let displayFoods = params.map((product) => {
        return ` <div class="card">
        <div class="imgWrapper">
            <img src="${product.imgUrl}" alt="">
        </div>
        <h1 class="name">${product.name}</h1>
        <h3 class="prize">${product.prize}</h3>
    </div>`
    })
    displayFoods = displayFoods.join('');
    container.innerHTML = displayFoods;
    
}

document.addEventListener('DOMContentLoaded', () => {
    getContent().then(data => {
        displayProducts(data);
    });
})