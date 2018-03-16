angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .config(['calendarConfig', function(calendarConfig) {

    // View all available config
    console.log(calendarConfig);

    // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
    calendarConfig.showTimesOnWeekView = true;

  }])
  .controller('KitchenSinkCtrl', function(moment, alert, calendarConfig) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    // vm.events = [
    //   {
    //     title: 'An event',
    //     startsAt: new Date('2018-03-01T10:30:28.644Z'),
    //     endsAt: new Date('2018-03-01T10:30:58.644Z'), //Round off to next minute
    //   },{
    //     title: 'An event 1',
    //     startsAt: new Date('2018-03-01T10:30:58.644Z'),
    //     endsAt: new Date('2018-03-01T10:32:58.644Z'), //Round off to next minute
    //   }, {
    //     title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
    //     startsAt: moment().subtract(1, 'day').toDate(),
    //     endsAt: moment().add(5, 'days').toDate(),
    //     draggable: true,
    //     resizable: true,
    //     dummyData: 'wertyui'
    //   }, {
    //     title: 'This is a really long event title that occurs on every year',
    //     startsAt: moment().startOf('day').add(7, 'hours').toDate(),
    //     endsAt: moment().startOf('day').add(19, 'hours').toDate(),
    //     recursOn: 'year',
    //     draggable: true,
    //     resizable: true,
    //   }
    // ];

    vm.events = [
      {
        title: 'An event',
        startsAt: new Date('2018-03-08T10:30:28.644Z'),
        endsAt: new Date('2018-03-08T10:31:28.644Z'), //Round off to next minute
      },{
        title: 'An event 12',
        startsAt: new Date('2018-03-08T10:31:38.644Z'),
        endsAt: new Date('2018-03-08T10:32:08.644Z'), //Round off to next minute
      },{
        title: 'Just another Event',
        startsAt: new Date('2018-03-08T10:30:28.644Z'),
        endsAt: new Date('2018-03-08T10:31:28.644Z'), //Round off to next minute
      },{
        title: 'An event 1',
        startsAt: new Date('2018-03-08T10:31:28.644Z'),
        endsAt: new Date('2018-03-08T10:32:28.644Z'), //Round off to next minute
      },{
        title: 'An event 11',
        startsAt: new Date('2018-03-08T10:30:28.644Z'),
        endsAt: new Date('2018-03-08T10:31:28.644Z'), //Round off to next minute
      },{
        title: 'An event 121',
        startsAt: new Date('2018-03-08T10:31:38.644Z'),
        endsAt: new Date('2018-03-08T10:32:08.644Z'), //Round off to next minute
      },{
        title: 'Just another Event 1',
        startsAt: new Date('2018-03-08T10:30:28.644Z'),
        endsAt: new Date('2018-03-08T10:31:28.644Z'), //Round off to next minute
      },{
        title: 'An event 111',
        startsAt: new Date('2018-03-08T10:31:28.644Z'),
        endsAt: new Date('2018-03-08T10:32:28.644Z'), //Round off to next minute
      },{
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true,
        dummyData: 'wertyui'
      }, {
        title: 'This is a really long event title that occurs on every year',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true,
      }
    ];

    vm.cellIsOpen = true;

    vm.addEvent = function() {
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  });
