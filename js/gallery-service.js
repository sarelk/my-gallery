'use strict'

var gProjs;

function createPorjects() {
    var projects = [];
    projects.push(createPorject("book-shop","Book Shop","Manage this back-end of a book shop", "A backend admin penel for a book e-commerce store, for the owner use or for his emplyees only. ",["Admin","Manage"]));
    projects.push(createPorject("meme-genereator","Meme genereator","A meme genereator using HTML5 canvas & JS", "An example of how a JS can manipulate the HTML5 canvas and create a meme genereator. Feel free to share your'e memes :)",["Meme","Genereator"]));
    projects.push(createPorject("mine-sweeper","Mine Sweeper","The classic game, now in JavaScript", "An example of vanilla javascript power, with recreating the nostalgic mine sweeper game. Enjoy",["Classic","Game"]));
    projects.push(createPorject("pac-man","Pacman","The classic game, now in JavaScript", "Another example of vanilla javascript power, recreating the nostalgic pacman game from the 80s.",["Classic","Game"]));
    projects.push(createPorject("ball-board","Ball Board","The classic game, now in JavaScript", "Another example of vanilla javascript power, recreating the nostalgic ball board game. Enjoy",["Classic","Game"]));
    projects.push(createPorject("to-do","To Do List","A simple to do system", "This is for the ones who just cant remember their tasks. with this todo, you can be sure youll finish youre tasks.",["Manage","Productivity"]));

    return projects;
}

function createPorject(id, name, title, desc, labels) {
    return {
        "id": id,
        "name": name,
        "title": title,
        "desc": desc, 
        "url": "projs/"+ id +"/index.html",
        "publishedAt": Date.now(),
        "labels": labels,
    };
}

function submitEmail($subject,$msg) {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=Sarelk@gmail.com&su='+ $subject +'&body='+ $msg +'', '_blank');
}

function openProj(projId) {
    console.log(projId)
    window.open(projId, '_blank');

}