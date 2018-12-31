// $(document).ready(function() {
var paymentDiv = $("#form-container");
paymentDiv.css("display", "none");

function buildForm() {
  if (SqPaymentForm.isSupportedBrowser()) {
    if (paymentDiv.css("display") === "none") {  
      paymentDiv.css("display", "block");
    } 

    paymentForm.build();
    paymentForm.recalculateSize();
  } else {
     console.log("The form is not supported");
  }
}


function requestCardNonce(event) {
    event.preventDefault(); // Don't submit the form until SqPaymentForm returns with a nonce
    paymentForm.requestCardNonce(); // Request a nonce from the SqPaymentForm object
}


var applicationId = "sandbox-sq0idp-3_4DBV5Bv2jPfmCXpw5mbA";
var locationId    = "CBASEPEbBfNv_ejs1wWjwd01mmcgAQ";
// Create and initialize a payment form object
var paymentForm = new SqPaymentForm({

  // Initialize the payment form elements
  applicationId: applicationId,
  locationId: locationId,
  inputClass: 'sq-input',
  autoBuild: false,

  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [{
    fontSize: '16px',
    fontFamily: 'Helvetica Neue',
    padding: '16px',
    color: '#373F4A',
    backgroundColor: 'transparent',
    lineHeight: '24px',
    placeholderColor: '#CCC',
    _webkitFontSmoothing: 'antialiased',
    _mozOsxFontSmoothing: 'grayscale'
  }],

  // Initialize Apple Pay placeholder ID
  applePay: false,

  // Initialize Masterpass placeholder ID
  masterpass: false,

  // Initialize the credit card placeholders
  cardNumber: {
    elementId: 'sq-card-number',
    placeholder: '• • • •  • • • •  • • • •  • • • •'
  },
  cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV'
  },
  expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
  },
  postalCode: {
    elementId: 'sq-postal-code',
    placeholder: '12345'
  },

  // SqPaymentForm callback functions
  callbacks: {
    /*
     * callback function: createPaymentRequest
     * Triggered when: a digital wallet payment button is clicked.
     * Replace the JSON object declaration with a function that creates
     * a JSON object with Digital Wallet payment details
     */
    createPaymentRequest: function () {
      return {
        requestShippingAddress: false,
        requestBillingInfo: true,
        currencyCode: "USD",
        countryCode: "US",
        total: {
          label: "MERCHANT NAME",
          amount: "100",
          pending: false
        },
        lineItems: [
          {
            label: "Subtotal",
            amount: "100",
            pending: false
          }
        ]
      }
    },

    
    cardNonceResponseReceived: function (errors, nonce, cardData) { // Triggered when: SqPaymentForm completes a card nonce request
      if (errors) {
        console.log("Encountered errors:");
        errors.forEach(function (error) {
          console.log('  ' + error.message);
          alert(error.message);
        });
        return;
      }
      document.getElementById('card-nonce').value = nonce; // Assign the nonce value to the hidden form field
      document.getElementById('nonce-form').submit(); // POST the nonce form to the payment processing page
    },

    
    unsupportedBrowserDetected: function () {
      console.log("There is a problem with this browser?!");
    },

    
    inputEventReceived: function (inputEvent) { // Triggered when: visitors interact with SqPaymentForm iframe elements.
      switch (inputEvent.eventType) {
        case 'focusClassAdded':
          break;
        case 'focusClassRemoved':
          break;
        case 'errorClassAdded':
          document.getElementById("error").innerHTML = "Please fix card information errors before continuing.";
          break;
        case 'errorClassRemoved':
          document.getElementById("error").style.display = "none";
          break;
        case 'cardBrandChanged':
          break;
        case 'postalCodeChanged':
          break;
      }
    },

    
    paymentFormLoaded: function () { 
      console.log("The form loaded!");
    }
  }
});
// });
