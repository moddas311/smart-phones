const loadPhones = async(searchText, dataLimit) =>{
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';

    // i want to show only 12 phones on display 
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 12){
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phone found
    const noPhones = document.getElementById('no-found-msg'); 
    if(phones.length === 0){
       noPhones.classList.remove('d-none');
    }
    else{
        noPhones.classList.add('d-none')
    }
    // display all phones 
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML =`
        <div class="card p-5 ">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">দিস ইজ দ্যা মারাত্নক ফোন তোমার অবশ্যই পছন্দ হবে।
                প্লিজ কিনে লাও | 😊</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
            </div
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleSpinar(false);
}
const processSearch = (dataLimit) =>{
    toggleSpinar(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
// use edd event listener

// handle search button clicked
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader 
    processSearch(10)
})
// search input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})
const toggleSpinar = isLoadaing =>{
    const loadingSection = document.getElementById('loader');
    if(isLoadaing){
        loadingSection.classList.remove('d-none');
    }
    else{
        loadingSection.classList.add('d-none');
    }
}
// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
}) 
const loadPhoneDetails = async id =>{
    const url = (`https://openapi.programming-hero.com/api/phone/${id}`);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modatTitle = document.getElementById('phoneDetailModalLabel');
    modatTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML =`
    <img src="${phone.image}" class="card-img-top" alt="...">
    <p>Relase Date: ${phone.releaseDate ? phone.releaseDate:'No Release Date Found'}</p>
    <p>Processor: ${phone.mainFeatures? phone.mainFeatures.chipSet : 'No Chipset Information'}</p>
    <p>Display: ${phone.mainFeatures? phone.mainFeatures.displaySize : 'No Display Information'}</p>
    <p>Variant: ${phone.mainFeatures? phone.mainFeatures.memory : 'No Memory Information'}</p>
    <p>Bluetooth: ${phone.others? phone.others.Bluetooth : 'No Bluetooth information'}</p>
    `;
}

loadPhones('a');