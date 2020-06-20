/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
		config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		// { name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' },
		{ name: 'sourcecode' },
		];
	//MathJax
	config.removeButtons = 'Save,NewPage,Preview,Print,PasteFromWord,PasteText,Paste,Copy,Cut,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,ImageButton,HiddenField,RemoveFormat,CopyFormatting,Indent,Outdent,Blockquote,CreateDiv,Language,Image,CodeSnippet,Flash,Table,HorizontalRule,Smiley,PageBreak,ShowBlocks,Maximize,About';
	config.mathJaxLib = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML';
	config.allowedContent = true
	config.extraPlugins = 'abbr';
	
	
};
