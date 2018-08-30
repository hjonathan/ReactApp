/* eslint-disable react/prefer-stateless-function */
import React from "react";

const locale = "en";
const t = str => str;
const getLanguages = () => {};

class RNI18n extends React.Component {
    render () {
        return null;
    }
}
RNI18n.locale = locale;
RNI18n.defaultLocale = locale;
RNI18n.t = t;
RNI18n.getLanguages = getLanguages;
export default RNI18n;
