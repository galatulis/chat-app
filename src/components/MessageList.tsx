import React from 'react';
import injectSheet, { WithSheet } from 'react-jss';
import { connect } from 'react-redux';

import { IGlobalState, IMessage } from '../interfaces';
import { createStyles } from '../utils';

interface IProps extends WithSheet<typeof styles> {
	listOfMessages: IMessage[];
}

const MessageList = ({ classes, listOfMessages }: IProps) => {
	return (
		<div className={classes.PanelMessage}>
			{listOfMessages.map(message => (
				<p key={message.id} className={classes.TextMessage}>
					<span className={classes.TextMessageAuthor}>{message.author}</span>
					&nbsp;&#58;&nbsp; {message.text}
				</p>
			))}
		</div>
	);
};

const styles = () =>
	createStyles({
		PanelMessage: {
			border: '1px solid #ddd',
			borderRadius: '3px',
			boxShadow: '1px 3px 5px rgba(0,0,0,0.2)',
			gridArea: 'content',
			overflow: 'auto',
			padding: '10px 5px'
		},
		TextMessage: {
			borderBottom: '1px solid #e9e9e9',
			color: '#555',
			margin: '0 20px',
			padding: '14px 0px',
			textIndent: '12px'
		},
		TextMessageAuthor: {
			color: '#42b0f4',
			textTransform: 'uppercase'
		}
	});

const mapStateToProps = (state: IGlobalState) => ({
	listOfMessages: state.listOfMessages
});

export default connect(mapStateToProps)(injectSheet(styles)(MessageList));
