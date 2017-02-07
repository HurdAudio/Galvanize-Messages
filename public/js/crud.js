'use strict';

$(document).ready(function() {
  const $display = $('#display');
  const $getMessages = $('#getAll');
  const $getIdMessage = $('#g2Button');
  const $inputId = $('#recordNumber');
  const $createInputName = $('#newName');
  const $createInputMessage = $('#newMessage');
  const $createMessage = $('#createMessage');
  const $updateInputId = $('#updateInputId');
  const $updateInputName = $('#updateInputName');
  const $updateInputMessage = $('#updateInputMessage');
  const $updateMessage = $('#updateButton');
  const $deleteInputId = $('#deleteInputId');
  const $deleteMessage = $('#dButton');

  // GET all messages
  $getMessages.click(function() {
    $.ajax({
      url: "/messages",
      type: "GET"
    }).done(function(data) {
      $display.empty();
      $.each(data, function(index, value) {
        $display.append(
          `<tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.message}</td>
          </tr>`
        );
      });
    });
  });

  // GET one message
  $getIdMessage.click(function() {
    let id = $inputId.val();

    $.ajax({
      url: `/messages/${id}`,
      type: "GET"
    }).done(function(data) {
      console.log(data);
      $display.empty();
      $display.append(
        `<tr>
          <td>${data.id}</td>
          <td>${data.name}</td>
          <td>${data.message}</td>
        </tr>`
      );
    });
  });

  // POST new message
  $createMessage.click(function() {
    let inputName = $createInputName.val();
    let inputMessage = $createInputMessage.val();
    let body = {
      "name": inputName,
      "message": inputMessage
    };

    $.ajax({
      url: "/messages",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(body)
    }).done(function(data) {
      console.log('Item Posted!');
      $display.empty();
      $display.append(
        `<tr>
          <td>${data.name}</td>
          <td>${data.message}</td>
        </tr>`
      );
    });
  });

  //PATCH update message
  $updateMessage.click(function() {
    let id = $updateInputId.val();
    let message = $updateInputMessage.val();
    let name = $updateInputName.val();

    $.ajax({
      url: `/messages/${id}`,
      type: 'PATCH',
      data: JSON.stringify({
      'name': name,
      'message': message
    }),
      contentType : 'application/json',
      dataType: "json",
      success: function() {
        console.log('Patched!');
      }
    });
  });

  //DELETE single message
  $deleteMessage.click(function() {
    let id = $deleteInputId.val();

    $.ajax({
      url: `/messages/${id}`,
      type: 'DELETE',
      contentType : 'application/json',
      dataType: "json",
      success: function() {
        console.log('Deleted!');
      }
    });
  });

});
