import React, { Component } from "react";
import { Image ,ImageBackground} from "react-native";

import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

import styles from "./style";

const drawerCover = require("../../../img/drawer-cover.png");

const drawerImage = require("../../../img/app-icon.png");

const datas = [
//	{
//		name: "Home",
//		route: "Home",
//		icon: "home",
//		bg: "#C5F442"
//	},
         {
		name: "Apply Loan",
		route: "Loanapplystart",
		icon: "jet",
		bg: "#EFB406"
		
	},
        
//        {
//		name: "College List",
//		route: "Listing",
//		icon: "search",
//		bg: "#EFB406"
//		
//	},

        	{
		name: "Contact Us",
		route: "Contactus",
		icon: "call",
		bg: "#C5F442"
	},
        
             	{
		name: "About Us",
		route: "Aboutus",
		icon: "contact",
		bg: "#C5F442"
	},
       //        {
//		name: "Search",
//		route: "Search",
//		icon: "call",
//		bg: "#EFB406"
//		
//	},
        


//{
//		name: "Document",
//		route: "Document",
//		icon: "document",
//		bg: "#EFB406"
//		
//	},
{
		name: "Logout",
		route: "Logout",
		icon: "exit",
		bg: "#EFB406"
		
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<ImageBackground source={drawerCover} style={styles.drawerCover}>
						<Image square style={styles.drawerImage} source={drawerImage} />
					</ImageBackground>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
