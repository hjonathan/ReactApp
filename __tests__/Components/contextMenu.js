import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import ContextMenu from '../../App/Components/ContextMenu';

describe('Component >>> ContextMenu', () => {
    const onClose = () => {},
        takeOne = () => {},
        selectFile = () => {};

    let contextMenu,
        contextMenuDefault;

    beforeEach(() => {
        contextMenuDefault = shallow(<ContextMenu />);
        contextMenu = shallow(<ContextMenu onClose={onClose} takeOne={takeOne} selectFile={selectFile} />);
    });

    test('Render contextMenu', () => {
        expect(toJson(contextMenu)).toMatchSnapshot();
        expect(toJson(contextMenuDefault)).toMatchSnapshot();
    });
    test('Render renderHeader', () => {
        let header,
            close;
        header = contextMenu.instance().renderHeader();
        close = header.props.children[1].props;
        expect(close.onPress()).toMatchSnapshot();
    });

    test('Render onCloseMenu', () => {
        expect(contextMenu.instance().onCloseMenu()).toMatchSnapshot();
        expect(contextMenuDefault.instance().onCloseMenu()).toMatchSnapshot();
    });

    test('Render takeButton', () => {
        let takeButton,
            takeButtonDef;
        takeButton = contextMenu.instance().renderTakeButton();
        takeButtonDef = contextMenuDefault.instance().renderTakeButton();
        expect(takeButton.props.children[0].props.onPress()).toMatchSnapshot();
        expect(takeButtonDef.props.children[0].props.onPress()).toMatchSnapshot();
    });

    test('Render galleryButton', () => {
        let galleryButton,
            galleryButtonDef;
        galleryButton = contextMenu.instance().renderGalleryButton();
        galleryButtonDef = contextMenuDefault.instance().renderGalleryButton();
        expect(galleryButton.props.children[0].props.onPress()).toMatchSnapshot();
        expect(galleryButtonDef.props.children[0].props.onPress()).toMatchSnapshot();
    });
});
