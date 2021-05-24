import { getPostsInfo, postSingature } from './ApiServices.js'

// 產生簽名畫布；設定畫布的寬度，畫筆顏色粗細
if ($('.js-signature').length) {
    $('.js-signature').jqSignature({
        width: 300,
        height: 300,
        border: '1px dashed #95a5a6', // 簽名版的框限(虛線)
        autoFit: false, // 簽名板至適應容器大小
        lineColor: '#2f3640', // 畫筆顏色
        lineWidth: 2, // 畫筆粗細
    });
}
/*
* Demo
*/

// 清除簽名
function clearCanvas() {
    // $('#signature').html('<p><em>Your signature will appear here when you click "Save Signature"</em></p>');
    $('.js-signature').eq(0).jqSignature('clearCanvas');
    $('#signature').empty();
    $('#saveBtn').attr('disabled', true);
};
$('#clearBtn').click(clearCanvas)

// 產生簽好的名
function saveSignature() {
    $('#signature').empty();
    var dataUrl = $('.js-signature').eq(0).jqSignature('getDataURL');
    var img = $('<img>').attr('src', dataUrl);
    var btn = $('<button>').attr('id', 'send');
    $('#signature').append($('<p>').text("這是您的簽名: "));
    $('#signature').append(img);
    $('#send').attr('disabled', false);
    if (img[0].src) {
        $('#saveBtn').attr('disabled', true);
    }
};
$('#saveBtn').click(saveSignature)

// 偵測如果有簽名了就把savBtn的disable解除
$('.js-signature').eq(0).on('jq.signature.changed', function () {
    $('#saveBtn').attr('disabled', false);
});

// 送出簽名的base64
function sendSingatureBase64(e) {
    let obj = []
    let dataUrl = $('.js-signature').eq(0).jqSignature('getDataURL');
    console.log('dataUrl: ', dataUrl);
    let data = {
        "base64": dataUrl
    };
    obj.push(data)

    console.log('obj: ', obj);
    postSingature(obj).then(res => {
        console.log(res);
    })
};
$('#send').click(sendSingatureBase64)

$('#get').click(function () {
    getPostsInfo().then(res => {
        console.log('res: ', res.data);
        let tempdata = res.data;
        tempdata.forEach(i => {
            console.log(i);
            // var img = $('<img>').attr('src', i);
            // $('#done').append(img);
        })
    });
})