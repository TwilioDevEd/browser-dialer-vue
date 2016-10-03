(function() {

// Custom directive to conditionally add/remove DOM attribute
Vue.directive('attr', {
  update: function(value) {
    if (value) {
      this.el.setAttribute(this.arg, 'true');
    } else {
      this.el.removeAttribute(this.arg);
    }
  }
});

new Vue({
  // Specify element for the dialer control
  el: '#dialer',

  // State data for dialer component
  data: {
    // Outgoing call country code
    countryCode: '1',
    currentNumber: '',
    muted: false,
    onPhone: false,
    identity: '',
    log: 'Connecting...',
    countries: [
      { name: 'United States', cc: '1', code: 'us' },
      { name: 'Great Britain', cc: '44', code: 'gb' },
      { name: 'Colombia', cc: '57', code: 'co' },
      { name: 'Ecuador', cc: '593', code: 'ec' },
      { name: 'Estonia', cc: '372', code: 'ee' },
      { name: 'Germany', cc: '49', code: 'de' },
      { name: 'Hong Kong', cc: '852', code: 'hk' },
      { name: 'Ireland', cc: '353', code: 'ie' },
      { name: 'Singapore', cc: '65', code: 'sg' },
      { name: 'Spain', cc: '34', code: 'es' },
      { name: 'Brazil', cc: '55', code: 'br' },
    ]
  },

  // Initialize after component creation
  created: function() {
    var self = this;

    // Fetch Twilio capability token from our Node.js server
    $.getJSON('/token').done(function(data) {
      self.identity = data.identity;
      Twilio.Device.setup(data.token);
      self.log = 'Connected with generated client name "'
        + self.identity + '"';
    }).fail(function(err) {
      console.log(err);
      self.log = 'Could not fetch token, see console.log';
    })

    // Configure event handlers for Twilio Device
    Twilio.Device.disconnect(function() {
      self.onPhone = false;
    });
  },

  computed: {
    // Computed property to validate the current phone number
    validPhone: function() {
      return /^([0-9]|#|\*)+$/.test(this.currentNumber);
    }
  },

  methods: {
    // Handle country code selection
    selectCountry: function(country) {
      this.countryCode = country.cc;
    },

    // Handle muting
    toggleMute: function() {
      this.muted = !this.muted;

      Twilio.Device.activeConnection().mute(this.muted);
    },

    // Make an outbound call with the current number,
    // or hang up the current call
    toggleCall: function() {
      if (!this.onPhone) {
        this.muted = false;
        this.onPhone = true;
        // make outbound call with current number
        var n = '+' + this.countryCode + this.currentNumber.replace(/\D/g, '');
        Twilio.Device.connect({ number: n });
        this.log = 'Calling ' + n;
      } else {
        // hang up call in progress
        Twilio.Device.disconnectAll();
      }
    },

    // Handle numeric buttons
    appendDigit: function(digit) {
      this.currentNumber += digit;

      var conn = Twilio.Device.activeConnection();
      if (conn && conn.status() == 'open') {
        conn.sendDigits(digit);
      }
    }
  }
});

})();
