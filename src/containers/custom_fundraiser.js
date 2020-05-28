"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FundingProgress = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

require("bootstrap/dist/css/bootstrap.min.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./custom_fundraiser.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOP_MIL_DIV = 'top_milestone_div';
var TOP_LINE_DIV = 'top_line_div';
var BOTTOM_MIL_DIV = 'bottom_milestone_div';
var BOTTOM_LINE_DIV = 'bottom_line_div';

var AnimatedCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AnimatedCard, _React$Component);

  function AnimatedCard() {
    _classCallCheck(this, AnimatedCard);

    return _possibleConstructorReturn(this, (AnimatedCard.__proto__ || Object.getPrototypeOf(AnimatedCard)).apply(this, arguments));
  }

  _createClass(AnimatedCard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          position = _props.position,
          digit = _props.digit,
          animation = _props.animation,
          style = _props.style,
          textStyle = _props.textStyle;
      return _react.default.createElement("div", {
        className: "flipCard ".concat(position, " ").concat(animation),
        style: style
      }, _react.default.createElement("span", {
        style: textStyle
      }, digit));
    }
  }]);

  return AnimatedCard;
}(_react.default.Component);

var StaticCard =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(StaticCard, _React$Component2);

  function StaticCard() {
    _classCallCheck(this, StaticCard);

    return _possibleConstructorReturn(this, (StaticCard.__proto__ || Object.getPrototypeOf(StaticCard)).apply(this, arguments));
  }

  _createClass(StaticCard, [{
    key: "render",
    value: function render() {
      var _props2 = this.props,
          position = _props2.position,
          digit = _props2.digit,
          style = _props2.style,
          textStyle = _props2.textStyle;
      return _react.default.createElement("div", {
        className: position,
        style: style
      }, _react.default.createElement("span", {
        style: textStyle
      }, digit));
    }
  }]);

  return StaticCard;
}(_react.default.Component);

var FlipUnitContainer =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(FlipUnitContainer, _React$Component3);

  function FlipUnitContainer() {
    _classCallCheck(this, FlipUnitContainer);

    return _possibleConstructorReturn(this, (FlipUnitContainer.__proto__ || Object.getPrototypeOf(FlipUnitContainer)).apply(this, arguments));
  }

  _createClass(FlipUnitContainer, [{
    key: "render",
    value: function render() {
      var _props3 = this.props,
          digit = _props3.digit,
          shuffle = _props3.shuffle,
          unit = _props3.unit,
          alias = _props3.alias,
          icoClockStyle = _props3.icoClockStyle,
          icoClockFlipStyle = _props3.icoClockFlipStyle,
          icoClockFlipTextStyle = _props3.icoClockFlipTextStyle,
          unitLabelContainerStyle = _props3.unitLabelContainerStyle,
          unitLabelTextStyle = _props3.unitLabelTextStyle;
      var now = digit;
      var before = digit === 59 ? 0 : digit + 1; // to prevent a negative value

      if (unit !== 'hours') {
        before = before === -1 ? 59 : before;
      } else {
        before = before === -1 ? 23 : before;
      } // add zero


      if (now < 10) now = "0".concat(now);
      if (before < 10) before = "0".concat(before); // shuffle digits

      var digit1 = shuffle ? before : now;
      var digit2 = !shuffle ? before : now; // shuffle animations

      var animation1 = shuffle ? 'fold' : 'unfold';
      var animation2 = !shuffle ? 'fold' : 'unfold';
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: 'flipUnitContainer',
        style: icoClockStyle
      }, _react.default.createElement(StaticCard, {
        position: 'upperCard',
        digit: now,
        style: icoClockFlipStyle,
        textStyle: icoClockFlipTextStyle
      }), _react.default.createElement(StaticCard, {
        position: 'lowerCard',
        digit: before,
        style: icoClockFlipStyle,
        textStyle: icoClockFlipTextStyle
      }), _react.default.createElement(AnimatedCard, {
        position: 'first',
        digit: digit1,
        animation: animation1,
        style: icoClockFlipStyle,
        textStyle: icoClockFlipTextStyle
      }), _react.default.createElement(AnimatedCard, {
        position: 'second',
        digit: digit2,
        animation: animation2,
        style: icoClockFlipStyle,
        textStyle: icoClockFlipTextStyle
      })), _react.default.createElement("div", {
        className: 'UnitItemContainer',
        style: unitLabelContainerStyle
      }, _react.default.createElement("span", {
        style: unitLabelTextStyle
      }, alias)));
    }
  }]);

  return FlipUnitContainer;
}(_react.default.Component);

var ShapeMilestone =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(ShapeMilestone, _React$Component4);

  function ShapeMilestone() {
    _classCallCheck(this, ShapeMilestone);

    return _possibleConstructorReturn(this, (ShapeMilestone.__proto__ || Object.getPrototypeOf(ShapeMilestone)).apply(this, arguments));
  }

  _createClass(ShapeMilestone, [{
    key: "render",
    value: function render() {
      var _props4 = this.props,
          softcap = _props4.softcap,
          hardcap = _props4.hardcap,
          currentFund = _props4.currentFund,
          divType = _props4.divType,
          line = _props4.line,
          currency = _props4.currency,
          milestones = _props4.milestones,
          milestoneLineColor = _props4.milestoneLineColor;
      // console.log('current Fund: ', currentFund);
      // console.log('Milstones: ', JSON.stringify(milestones));
      var previousCap = 0;
      var divs = milestones.map(function (item, i) {
        var width = i == 0 ? item.cap / hardcap * 100 : Math.abs(item.cap - previousCap) / hardcap * 100;
        previousCap = item.cap;

        var _classname,
            _milestoneText = '';

        switch (divType) {
          case TOP_MIL_DIV:
            _classname = i % 2 === 0 ? 'milestone' : 'empty-div';
            _milestoneText = i % 2 === 0 ? item.text : '';
            break;

          case TOP_LINE_DIV:
            _classname = i % 2 === 0 ? 'vl' : 'empty-div';
            break;

          case BOTTOM_LINE_DIV:
            _classname = i % 2 != 0 ? 'vl' : 'empty-div';
            break;

          case BOTTOM_MIL_DIV:
            _milestoneText = i % 2 != 0 ? item.text : '';
            _classname = i % 2 != 0 ? 'milestone' : 'empty-div';
            break;

          default:
        }

        if (line) {
          return _react.default.createElement("div", {
            key: i,
            className: _classname,
            style: {
              width: "".concat(width, "%"),
              borderColor: milestoneLineColor
            }
          });
        } else {
          return _react.default.createElement("div", {
            key: i,
            className: _classname,
            style: {
              width: "".concat(width, "%")
            }
          }, _react.default.createElement("span", {
            style: {
              color: milestoneLineColor
            }
          }, _milestoneText));
        }
      }); // this.props.onTimerComplete();

      return divs;
    }
  }]);

  return ShapeMilestone;
}(_react.default.Component);

ShapeMilestone.propTypes = {
  line: _propTypes.default.bool
};
ShapeMilestone.defaultProps = {
  line: false
};

var FundingProgress =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(FundingProgress, _React$Component5);

  function FundingProgress() {
    _classCallCheck(this, FundingProgress);

    return _possibleConstructorReturn(this, (FundingProgress.__proto__ || Object.getPrototypeOf(FundingProgress)).apply(this, arguments));
  }

  _createClass(FundingProgress, [{
    key: "render",
    value: function render() {
      var _props5 = this.props,
          currentFund = _props5.currentFund,
          softcap = _props5.softcap,
          hardcap = _props5.hardcap,
          currency = _props5.currency,
          milestones = _props5.milestones,
          progressColor = _props5.progressColor,
          milestoneLineColor = _props5.milestoneLineColor,
          icoProgress = _props5.icoProgress;
      return icoProgress ? _react.default.createElement("div", {
        className: 'ProgressContainer'
      }, _react.default.createElement("div", {
        className: 'flexLines'
      }, _react.default.createElement(ShapeMilestone, _extends({
        divType: TOP_MIL_DIV
      }, this.props))), _react.default.createElement("div", {
        className: 'flexLines'
      }, _react.default.createElement(ShapeMilestone, _extends({}, this.props, {
        divType: TOP_LINE_DIV,
        line: true
      }))), _react.default.createElement(_reactstrap.Progress, {
        active: true,
        animated: true,
        max: 100,
        color: progressColor,
        value: currentFund / hardcap * 100
      }, _react.default.createElement("span", {
        style: {
          color: this.props.milestoneLineColor
        },
        className: 'progressText'
      }, "".concat(parseInt(currentFund / softcap * 100), "% Funded"))), _react.default.createElement("div", {
        className: 'flexLines'
      }, _react.default.createElement(ShapeMilestone, _extends({
        line: true,
        divType: BOTTOM_LINE_DIV
      }, this.props))), _react.default.createElement("div", {
        className: 'flexLines'
      }, _react.default.createElement(ShapeMilestone, _extends({
        divType: BOTTOM_MIL_DIV
      }, this.props)))) : null;
    }
  }]);

  return FundingProgress;
}(_react.default.Component);

exports.FundingProgress = FundingProgress;

var FundClockProgress =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(FundClockProgress, _React$Component6);

  function FundClockProgress(props) {
    var _this;

    _classCallCheck(this, FundClockProgress);

    _this = _possibleConstructorReturn(this, (FundClockProgress.__proto__ || Object.getPrototypeOf(FundClockProgress)).call(this, props));
    _this.state = {
      days: 0,
      daysShuffle: true,
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
      isExpired: false
    };
    return _this;
  }

  _createClass(FundClockProgress, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.icoCountDown = setInterval(function () {
        return _this2.updateTime();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.icoCountDown);
    }
  }, {
    key: "updateTime",
    value: function updateTime() {
      // get new date
      var _props6 = this.props,
          onTimerComplete = _props6.onTimerComplete,
          campaignEndDate = _props6.campaignEndDate;
      var now = new Date(); // get campaign end Date

      var _campaignEndDate = new Date(campaignEndDate); // set time units


      if (_campaignEndDate > now) {
        var distance = Math.abs(_campaignEndDate - now) / 1000; // calculate (and subtract) whole days

        var days = Math.floor(distance / 86400);
        distance -= days * 86400; // calculate (and subtract) whole hours

        var hours = Math.floor(distance / 3600) % 24;
        distance -= hours * 3600; // calculate (and subtract) whole minutes

        var minutes = Math.floor(distance / 60) % 60;
        distance -= minutes * 60; // what's left is seconds

        var seconds = parseInt(distance); // on days chanage, update days and shuffle state

        if (days !== this.state.days) {
          var daysShuffle = !this.state.daysShuffle;
          this.setState({
            days: days,
            daysShuffle: daysShuffle
          });
        } // on hour chanage, update hours and shuffle state


        if (hours !== this.state.hours) {
          var hoursShuffle = !this.state.hoursShuffle;
          this.setState({
            hours: hours,
            hoursShuffle: hoursShuffle
          });
        } // on minute chanage, update minutes and shuffle state


        if (minutes !== this.state.minutes) {
          var minutesShuffle = !this.state.minutesShuffle;
          this.setState({
            minutes: minutes,
            minutesShuffle: minutesShuffle
          });
        } // on second chanage, update seconds and shuffle state


        if (seconds !== this.state.seconds) {
          var secondsShuffle = !this.state.secondsShuffle;
          this.setState({
            seconds: seconds,
            secondsShuffle: secondsShuffle
          });
        }
      } else {
        clearInterval(this.icoCountDown);
        this.setState({
          isExpired: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          days = _state.days,
          hours = _state.hours,
          minutes = _state.minutes,
          seconds = _state.seconds,
          daysShuffle = _state.daysShuffle,
          hoursShuffle = _state.hoursShuffle,
          minutesShuffle = _state.minutesShuffle,
          secondsShuffle = _state.secondsShuffle,
          isExpired = _state.isExpired;
      var _props7 = this.props,
          softcap = _props7.softcap,
          hardcap = _props7.hardcap,
          Milestones = _props7.Milestones,
          icoProgress = _props7.icoProgress,
          milestones = _props7.milestones;
      return isExpired && icoProgress ? _react.default.createElement(FundingProgress, this.props) : _react.default.createElement("div", {
        className: 'flipClock'
      }, _react.default.createElement(FlipUnitContainer, _extends({
        unit: 'days',
        alias: 'Days',
        digit: days,
        shuffle: daysShuffle
      }, this.props)), _react.default.createElement(FlipUnitContainer, _extends({
        unit: 'hours',
        alias: 'Hours',
        digit: hours,
        shuffle: hoursShuffle
      }, this.props)), _react.default.createElement(FlipUnitContainer, _extends({
        unit: 'minutes',
        alias: 'Mins',
        digit: minutes,
        shuffle: minutesShuffle
      }, this.props)), _react.default.createElement(FlipUnitContainer, _extends({
        unit: 'seconds',
        alias: 'Secs',
        digit: seconds,
        shuffle: secondsShuffle
      }, this.props)));
    }
  }]);

  return FundClockProgress;
}(_react.default.Component);

FundClockProgress.propTypes = {
  campaignEndDate: _propTypes.default.string,
  currency: _propTypes.default.string,
  currentFund: _propTypes.default.number,
  softcap: _propTypes.default.number,
  hardcap: _propTypes.default.number,
  milestones: _propTypes.default.array,
  icoProgress: _propTypes.default.bool,
  onTimerComplete: _propTypes.default.func,
  milestoneLineColor: _propTypes.default.string,
  icoClockStyle: _propTypes.default.object,
  icoClockFlipStyle: _propTypes.default.object,
  unitLabelContainerStyle: _propTypes.default.object,
  unitLabelTextStyle: _propTypes.default.object,
  icoClockFlipTextStyle: _propTypes.default.object
};
FundClockProgress.defaultProps = {
  // campaignEndDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds() + 0).toString(),
  icoProgress: false,
  currentFund: 0,
  softcap: 0,
  hardcap: 0,
  milestones: [],
  currency: '$',
  milestoneLineColor: 'grey',
  icoClockStyle: {},
  icoClockFlipStyle: {},
  unitLabelContainerStyle: {},
  unitLabelTextStyle: {},
  icoClockFlipTextStyle: {}
};
var _default = FundClockProgress;
exports.default = _default;