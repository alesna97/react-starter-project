import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import clsx from 'clsx';
import useStyles from '../Sidebar/useStyles';

const Footer = ({ open }) => {
	const classes = useStyles();
	return (
		<Box
			className={clsx(classes.footer, {
				[classes.footerShift]: open,
			})}
		>
			<div className={clsx(classes.footerTitleShift, {
				[classes.footerTitle]: open,
			})}>
				Doterb Solution @ 2020
			</div>
		</Box>
	);
};

export default Footer;
