$(document).ready(function () {
  const listContainer = $('#list');

  $('#add-btn').on('click', function () {
    const title = $('#title').val();
    const author = $('#author').val();
    if (title === "" || author === "") {
      alert("Both input fields required!");
      refreshInput();
      return;
    }

    const pText = '"' + title + '"' + " by " + author;
    const listItem = $('<li>').append($('<p>').text(pText))
      .append($('<div>').addClass('button-container')
      .append($('<button>').addClass('edit-btn').text('Edit'))
      .append($('<button>').addClass('remove-btn').text('Remove')));
    listContainer.append(listItem);
    refreshInput();
  });

  listContainer.on('click', '.remove-btn', function () {
    const listItem = $(this).closest('li');
    listItem.remove();
  });

  listContainer.on('click', '.edit-btn', function () {
    const listItem = $(this).closest('li');
    const pText = listItem.find('p').text();
    const [title, author] = extractTitleAndAuthor(pText);

    $('#title').val(title);
    $('#author').val(author);
    listItem.remove();
  });

  function refreshInput() {
    $('#title').val("");
    $('#author').val("");
  }

  function extractTitleAndAuthor(text) {
    const matches = text.match(/"([^"]+)" by (.+)/);
    if (matches && matches.length === 3) {
      return [matches[1], matches[2]];
    }
    return ["", ""];
  }
});