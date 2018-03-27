class Sanitary {
    
    constructor( liter = 0, name = "Sanitaire" ) {
        this.liter      = liter
        this.name       = name
        this.total      = 0
    }
    consumes() {
        this.total += this.liter
    }
}

class Sink extends Sanitary {
    constructor() {
        super(2, "sink")
    }
}

class Shower extends Sanitary {
    constructor() {
        super(1, "shower")
    }
}

class Bathtub extends Sanitary {
    constructor() {
        super(5, "bathtub")
    }
}

class Jacuzzi extends Sanitary {
    constructor() {
        super(10, "jacuzzi")
    }
}

class Meter {
    constructor() {
        this.total = 0
    }
    addTotal( numberToAdd ) {
        return this.total += numberToAdd
    }
}

class Apartment extends Meter {
    
    constructor( sanitaries = [] ) {
        super()
        this.sanitaries = sanitaries
    }
    
}

class SmallApartment extends Apartment {
    
    constructor() {
        super( [ new Sink(), new Shower() ] )
    }
    
}

class BigApartment extends Apartment {
    
    constructor() {
        super( [ new Bathtub(), new Sink(), new Sink() ] )
    }
    
}

class Floor extends Meter {
    constructor( apartments = [] ) {
        super()
        this.apartments  = apartments
    }
}

class Building extends Meter {
    constructor( floors = [], name = 1 ) {
        super()
        this.floors         = floors
        this.name = name
    }
}

class Residence extends Meter {
    constructor( buildings = [] ) {
        super()
        this.buildings  = buildings
    }
}

const displaySanitaries = ( sanitaries, indice ) => {
    
    sanitaries.forEach( (elem, idx) => {
        const id = JSON.stringify(indice + "_" + idx)
        content += `<li onclick=clickApartment(${id}) class="sanitary" id=${id}>
            <div class="sanitary-img ${elem.name}"></div>
            <span class='total'>${elem.total}</span>
        </li>`
    }, content = '')
    
    return content
    
}

let nbrApartments = 0

const displayApartments = ( apartments, indice ) => {
    
    apartments.forEach( ( apartment, idx ) => {
        nbrApartments++;
        const id = indice + "_" + idx
        content += `<div class='apartment' id=${id}>
        <h4>Appartement ${idx + 1}</h4>
        <ul class="sanitaries s_${apartment.sanitaries.length + 1}">
            <li class="sanitary">
                <div class="sanitary-img drop"></div>
                <span class='drop-total'>${apartment.total}</span>
            </li>
            ${displaySanitaries( apartment.sanitaries, id )}
        </ul>
        </div>`
    }, content = '', nbrApartments )
    
    document.getElementsByClassName('totals-apartment')[0].getElementsByClassName('total')[0].innerHTML = nbrApartments
    
    return content
}

const displayFloors = ( floors, indice ) => {
    
    floors.forEach( ( floor, idx ) => {
        const id = indice + "_" + idx
        content += `<div class='floor' id=${id}>
        <div class="totals">
            <ul>
                <li class="totals-building">
                    <h3>ÉTAGE</h3>
                    <span class="total">${idx + 1}</span>
                </li>
                <li class="totals-apartment">
                    <h3>APPARTEMENTS</h3>
                    <span class="total">${floor.apartments.length}</span>
                </li>
                <li class="totals-water">
                    <h3>TOTAL</h3>
                    <span class="total">${floor.total}</span>
                </li>
            </ul>
        </div>
        ${displayApartments( floor.apartments, id )}
        </div>`
    }, content = '')
    return content
}

const displayBuildings = ( buildings ) => {
    
    buildings.forEach( ( building, idx ) => {
        content += `<div class='building' id=${idx}>
            <header class="building-header"> <h1> IMMEUBLE ${building.name} </h1> </header>
            <div class="building-body">
                ${displayFloors( building.floors, idx )}
            </div>
            <footer class="building-footer">Consommation totale : <span class='total'>${building.total}</span></footer>
        </div>`
    }, content = '')
    
    return content
    
}

const displayResidence = ( residence ) => {

    document.getElementsByClassName('totals-water')[0].getElementsByClassName('total')[0].innerHTML = residence.total
    document.getElementsByClassName('totals-building')[0].getElementsByClassName('total')[0].innerHTML = residence.buildings.length
    
    document.getElementById('residence').innerHTML += `${displayBuildings( residence.buildings )}`
    
}

const residence =
new Residence(
    [
        new Building(
            [
                new Floor(
                    [
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment()
                    ]
                ),
                new Floor(
                    [
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment()
                    ]
                )
            ],
            "A"
        ),
        new Building(
            [
                new Floor(
                    [
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment()
                    ]
                ),
                new Floor(
                    [
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment()
                    ]
                ),
                new Floor(
                    [
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment(),
                        new SmallApartment()
                    ]
                )
            ],
            "B"
        ),
        new Building(
            [
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                )
            ],
            "C"
        ),
        new Building(
            [
                new Floor(
                    [
                        new Apartment( [ new Jacuzzi(), new Sink(), new Sink() ] ),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                ),
                new Floor(
                    [
                        new BigApartment(),
                        new BigApartment()
                    ]
                )
            ],
            "D"
        ),
        
    ]
)


displayResidence( residence )

let isActive = false
const consumeAllWater = (event) => {
    if ( !isActive )
    {
        event.target.parentElement.className += ' active'
        console.log('coucou');
    }
    else
    {
        event.target.parentElement.classList.remove('active')
    }
    isActive = !isActive
}

const clickApartment = ( apartmentIndex ) => consumeOne( apartmentIndex )

const consumeOne = ( apartmentIndex ) => {
    
    const idx           = apartmentIndex.split("_")
    const sanitaryDOM   = residence.buildings[idx[0]].floors[idx[1]].apartments[idx[2]].sanitaries[idx[3]]
    const apartmentDOM  = residence.buildings[idx[0]].floors[idx[1]].apartments[idx[2]]
    const floorDOM      = residence.buildings[idx[0]].floors[idx[1]]
    const buildingDOM   = residence.buildings[idx[0]]
    const residenceDOM  = residence
    
    sanitaryDOM.consumes()
    
    // Sanitary
    document.getElementById( apartmentIndex ).getElementsByClassName('total')[0].innerHTML = sanitaryDOM.total
    
    // Apartment
    document.getElementById( apartmentIndex.split( /(_[0-9]){1}$/g)[0] ).getElementsByClassName('drop-total')[0].innerHTML = apartmentDOM.addTotal( sanitaryDOM.liter )
    
    // Floor
    document.getElementById( apartmentIndex.split( /(_[0-9]){2}$/g)[0] ).getElementsByClassName('totals-water')[0].getElementsByClassName('total')[0].innerHTML = floorDOM.addTotal( sanitaryDOM.liter )

    // Building
    document.getElementById( apartmentIndex.split( /(_[0-9]){3}$/g)[0] ).getElementsByClassName('building-footer')[0].getElementsByClassName('total')[0].innerHTML = buildingDOM.addTotal( sanitaryDOM.liter )
    
    // Residence
    document.getElementsByClassName('totals-water')[0].getElementsByClassName('total')[0].innerHTML = residenceDOM.addTotal( sanitaryDOM.liter )
    
}
