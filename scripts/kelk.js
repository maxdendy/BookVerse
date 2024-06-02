// noinspection JSUnresolvedReference

async function send() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publishing = document.getElementById('publishing').value;
    const isbn = document.getElementById('isbn').value;

    const response = await fetch('/post', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title,
            author: author,
            publishing: publishing,
            isbn: isbn,
        }),
    })

    if (response.ok) {
        let data = await response.json()
        build(data)
    } else {
        console.log('okn\'t')
    }
}

function build(data) {
    let books = data.books
    console.log(books)
    let elements = books.length


    let main = document.getElementById('main')
    let zone = document.createElement('div')
    zone.className = 'result-zone'
    let grid = document.createElement('div')
    grid.className = 'result-grid'
    zone.appendChild(grid)
    main.removeChild(main.children[3])
    main.appendChild(zone)

    let lines = main.children[0].children;
    for (let i = 0; i < lines.length; i++) {
        lines[i].className = 'rectangles r1' + (i + 3) + ' e' + ((elements + 1) / 2 | 0)
    }

    for (let i = 0; i < elements; i++) {
        let book = books[i]

        let child = document.createElement('div')
        child.className = 'result r' + (i + 1)

        let names = [
            'result-title',
            'result-author',
        ]
        let texts = [
            book.title,
            book.author,
        ]
        for (let j = 0; j < names.length; j++) {
            let c = document.createElement('div');
            c.className = 'result-text ' + names[j];
            c.textContent = texts[j];
            child.appendChild(c);
        }

        let element = document.createElement('div');
        element.className = 'result-data';
        let ash = [
            document.createElement('a'),
            document.createElement('br'),
            document.createElement('a'),
            document.createElement('br'),
            document.createElement('br'),
            document.createElement('a'),
            document.createElement('br'),
            document.createElement('a'),
        ]
        ash[0].textContent = 'Издательство'
        ash[0].className = 'data-text'
        ash[2].textContent = book.publishing
        ash[2].className = 'data-text'
        ash[5].textContent = 'Издательство'
        ash[5].className = 'data-text'
        ash[7].textContent = book.isbn
        ash[7].className = 'data-text'
        for (let a in ash) {
            element.appendChild(ash[a])
        }
        child.appendChild(element)

        let prices = document.createElement('div')
        prices.className = 'prices';

        for (let j = 0; j < book.prices.length; j++) {
            let div = document.createElement('div')
            div.className = 't t' + (j + 1)
            div.textContent = book.prices[j].store
            prices.appendChild(div)
            let a = document.createElement('a')
            a.className = 'b b' + (j + 1)
            a.textContent = book.prices[j].price
            a.href = book.prices[j].url
            prices.appendChild(a)
        }

        child.appendChild(prices)
        grid.appendChild(child)
    }
}
