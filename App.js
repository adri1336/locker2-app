import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

const moveStepper = async (url, steps = 4096, reverse = 0) => {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: "steps=" + steps + "&reverse=" + reverse
		});

		console.log("Status code: " + response.status);
	}
	catch(error) {
		console.error(error);
	}
};

export default function App() {
	const [url, setUrl] = React.useState("http://192.168.1.64/");
	const [steps, setSteps] = React.useState("4096");
	const [reverse, setReverse] = React.useState("0");
	
	return (
		<View style={ styles.container }>
			<StatusBar style="auto"/>
			<TextInput
				style={ styles.input }
				placeholder="IP"
				keyboardType="url"
				value={ url }
				onChangeText={ text => setUrl(text) }
			/>
			<TextInput
				style={ styles.input }
				placeholder="Steps"
				keyboardType="number-pad"
				value={ steps }
				onChangeText={ text => setSteps(text) }
			/>
			<TextInput
				style={ styles.input }
				placeholder="Reverse"
				keyboardType="number-pad"
				value={ reverse }
				onChangeText={ text => setReverse(text) }
			/>
			<Button
				title="Go!"
				onPress={
					() => {
						//console.log("url: " + url + " steps: " + steps + " reverse: " + reverse);
						moveStepper(url, steps, reverse);
					}
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	input: {
		width: 300,
		height: 40,
		padding: 8,
		margin: 12,
		borderWidth: 1
	}
});
