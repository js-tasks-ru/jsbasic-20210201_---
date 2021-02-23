  function makeFriendsList(arrFriends) {

    let arrMap = arrFriends.map(function(item){
      return `${item.firstName} ${item.lastName}`
    });
    
    let ul = document.createElement('ul');
    document.body.append(ul);
    
    for (let name of arrMap) {
      let li = document.createElement('li');
      li.innerText = name; 
      ul.append(li);
    }

    return ul;
  }
