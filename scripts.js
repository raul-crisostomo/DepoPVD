var scanner;

// Events
$(document).ready(function() {
    $("#item_description").val("Item de prueba " + new Date().toJSON().split('T')[1]); //TODO: pasar la hora a timezone local
    hideModal();
    populateCollectors();
    populateFlows();
});

$("#qr_content").keypress(function (event) {
    if (event.keyCode === 13) { //Execute request on enter.
        $("#post-btn").click();
    }
});

$("#post-btn").click(function () {
    processPayment();
});

$("#scan-qr-btn").click(function webcam() { // webcam button pressed
    buildRequestBody();//quitar
    initializeWebcam();
});

$("#collectors-sel").change(function() { // selected collector changed
    console.log("Current id: " + $("#collectors-sel").val());
    console.log(getSelectedCollector());
});

$('#staticBackdrop').on('hidden.bs.modal', function () {
    stopScanner();
    hideModal();
});

$('#staticBackdrop').on('shown.bs.modal', function () {
    $("#qr_content").val('');
    $(this).find('input:first').focus();
});

// functions
function processPayment() {
    executeRequest(buildUrl(), buildRequestBody());
}

function executeRequest(url, body) {
    showSpinner();
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers(), 'X-Idempotency-Key': Math.floor(Math.random() * 1000000)
    })
    .then((res) => { console.log(res);
        return res.json();           
    })
    .then((data) => {
        displayRequestInfo(url, body, data);
        hideModal();
    })
    .catch(function(error) {
        console.log('Hubo un problema con el request' + error.message);
        console.log(error);
    });
}

function buildUrl() {//construye el url cambiando los valores del flujo seleccionado
    let selectedFlow = getSelectedFlow();
    let collector = getSelectedCollector();
    
    return selectedFlow.url.replace("{COLLECTOR_ID}", collector.id)
                .replace("{EXTERNAL_STORE_ID}", collector.externalStoreId)
                .replace("{EXTERNAL_POS_ID}", collector.externalPosId)
                .replace("{ACCESS_TOKEN}", collector.accessToken);

}

function buildRequestBody() {
    let paymentAmount1 =  document.querySelector("#payment_1").value;
    let itemDescription1 = $("#item_1").val();
    let paymentAmount2 = $("#payment_2").val();
    let itemDescription2 = $("#item_2").val();
    console.log(paymentAmount1)
    console.log(itemDescription1)
    console.log(paymentAmount2)
    console.log(itemDescription2)

    let cashoutAmount = "0";
    let externalReference = "ticket001";
    let qrContent = $("#qr_content").val();

    let selectedFlow = getSelectedFlow();
    let collector = getSelectedCollector();
    
    let body = selectedFlow.body
        .replaceAll("{EXTERNAL_REFERENCE}", externalReference)
        .replaceAll("{EXTERNAL_POS_ID}", collector.externalPosId)
        .replaceAll("{PAYMENT_AMOUNT_1}", paymentAmount1)
        .replaceAll("{ITEM_DESCRIPTION_1}", itemDescription1)
        .replaceAll("{PAYMENT_AMOUNT_2}", paymentAmount2)
        .replaceAll("{ITEM_DESCRIPTION_2}", itemDescription2)
        .replaceAll("{ORDER_TITLE}", itemDescription1) 
        .replaceAll("{ORDER_DESCRIPTION}", itemDescription1)
        //TODO stop using itemDescription for order title and order description. New fields should be added to the form
        .replaceAll("{QR_CONTENT}", qrContent)
        .replaceAll("{COLLECTOR_ID}", collector.id)
        .replaceAll("{CASHOUT_AMOUNT}", cashoutAmount)
        .replaceAll("{TOTAL_AMOUNT}", parseFloat(paymentAmount1) + parseFloat(paymentAmount2) + parseFloat(cashoutAmount));
    
    let result = JSON.parse(body);
    if (cashoutAmount <= 0) {
        delete result["cash_out"];
    }

    return result;
}

function displayRequestInfo(url, request, response) {
    $("#request").html("<pre class=\"Bienvenido\">" 
        + "URL: " + url 
        + "\nBody: " + JSON.stringify(request, null, 2) 
        + "</pre>");
    $("#response").html("<pre>" + JSON.stringify(response, null, 2) + "</pre>");
}


function getSelectedCollector() {
    const params = new URLSearchParams(window.location.search)
    let site_id=params.get('site')
    //console.log(COLLECTORS.filter(item => item.displayName == site_id)[0])//ver en consola
    return COLLECTORS.filter(item => item.displayName == site_id)[0];//del objeto collectors regresa el elemento de los items cuyo id == al valor de colectors-sel
}

function populateFlows() {
    console.log(QRC_VERSIONS);
    $("#qrc-flows-sel").html("");
    $.each(QRC_VERSIONS, function() {
        $("#qrc-flows-sel").append('<option value=' + this.id + '>' + this.displayName + '</option>');
    });
    $("#qrc-flows-sel").change(); //hides cash out field if necessary
}

function getSelectedFlow() {
    return QRC_VERSIONS.filter(item => item.id == "QRC")[0];   
}

$("#qrc-flows-sel").change(function() {
    let currentFlow = getSelectedFlow();
    let cashoutDiv = $("#cashout-fields");
    
    //TODO: mejorar esta lógica, tiene un bug.
    if (currentFlow.allowExtraCash) {
        cashoutDiv.removeClass("d-none")    
    } else {
        cashoutDiv.addClass("d-none")    
    }
});

function showSpinner() {
    $("#spinner").show();
    $("#post-btn").hide();
}

function hideModal() {
    $('#staticBackdrop').modal('hide');
    $("#spinner").hide();
    $("#post-btn").show();
}

function initializeWebcam() {
    scanner = new Instascan.Scanner({ video: document.getElementById('preview'), backgroundScan: false });
    scanner.addListener('scan', function (content) {
        console.log(content);
        $("#qr_content").val(content);
        scanner.stop();
        processPayment();
    });

    Instascan.Camera.getCameras(false).then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            alert("No camera found.");
        }
    }).catch(function (e) {
        console.error(e);
    });
}

function stopScanner() {
    if (scanner != null) {
        scanner.stop();
    }
}

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
};
