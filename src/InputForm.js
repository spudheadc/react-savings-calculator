import React from "react";
import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { setAmount } from "./actions/setAmount";
import { setRate } from "./actions/setRate";
import { setSavings } from "./actions/setSavings";
import { connect } from "react-redux";

class InputForm extends Component {
    constructor() {
        super();
        this.fieldSetter = {
            currentSavings: "setAmount",
            interestRate: "setRate",
            weeklySavings: "setSavings"
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        var func = this.props[this.fieldSetter[event.target.id]];
        func(event.target.value);
    }
    render() {
        const { currentSavings, weeklySavings, interestRate } = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    My Input
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={8} sm={4}>
                        <TextField
                            required
                            id="currentSavings"
                            name="currentSavings"
                            label="Current Savings"
                            fullWidth
                            autoComplete="csavings"
                            onBlur={this.handleChange}
                            defaultValue={currentSavings}
                        />
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <TextField
                            required
                            id="weeklySavings"
                            name="weeklySavings"
                            label="Weekly Savings"
                            fullWidth
                            autoComplete="wsavings"
                            onBlur={this.handleChange}
                            defaultValue={weeklySavings}
                        />
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <TextField
                            required
                            id="interestRate"
                            name="interestRate"
                            label="Interest Rate"
                            fullWidth
                            autoComplete="interestRate"
                            onBlur={this.handleChange}
                            defaultValue={interestRate}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentSavings: state.initialBalance,
        interestRate: state.interestRate,
        weeklySavings: state.weeklySavings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setAmount: currentSavings => dispatch(setAmount(currentSavings)),
        setRate: interestRate => dispatch(setRate(interestRate)),
        setSavings: weeklySavings => dispatch(setSavings(weeklySavings))
    };
};
const Form = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputForm);
export default Form;
