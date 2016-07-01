window.addEventListener('load', function() {
  function showOne(ev) {
    ev.preventDefault();
    var href = ev.target.href;
    fetch(href).then(function(resp) {
      return resp.json();
    }).then(function(json) {
      setContents([json]);
    });
  }
  function setRecentLs(json) {
    var recentLs = document.getElementById('recentLs');
    for (var val of json) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.appendChild(document.createTextNode(val.title));
      a.setAttribute('href', '/blog/' + val.id);
      a.addEventListener('click', showOne);
      li.appendChild(a);
      recentLs.appendChild(li);
    }
  }
  function setContents(json) {
    var contents = document.getElementById('contents');
    for (var i = contents.childNodes.length - 1; i >= 0; i--) {
      contents.removeChild(contents.childNodes[i]);
    }
    for (var val of json) {
      var sec = document.createElement('section');
      var h3 = document.createElement('h3');
      h3.appendChild(document.createTextNode(val.title));
      var p = document.createElement('p');
      p.appendChild(document.createTextNode(val.body));
      var div = document.createElement('div');
      var span1 = document.createElement('span');
      span1.appendChild(document.createTextNode('author:' + val.author));
      var span2 = document.createElement('span');
      span2.appendChild(document.createTextNode('|'));
      var span3 = document.createElement('span');
      span3.appendChild(document.createTextNode('date:' + val.date));
      div.appendChild(span1);
      div.appendChild(span2);
      div.appendChild(span3);
      sec.appendChild(h3);
      sec.appendChild(p);
      sec.appendChild(div);
      contents.appendChild(sec)
      contents.appendChild(document.createElement('hr'));
    }
  }
  fetch('/blog').then(function(resp) {
    return resp.json();
  }).then(function(json) {
    json = json.reverse();
    setRecentLs(json);
    setContents(json);
  });
  var form = document.getElementById('postForm');
  form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var inTitle = document.getElementById('inTitle');
    var inBody = document.getElementById('inBody');
    var inAuthor = document.getElementById('author');
    var data = {
      title: inTitle.value,
      body: inBody.value,
      author: inAuthor.value
    };
    fetch('/blog', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(resp) {
      return resp.text();
    }).then(function(text) {
      console.log(text);
      window.alert('ok');
    }).catch(function(err) {
      console.log(err);
      window.alert('fail');
    });
  });
});