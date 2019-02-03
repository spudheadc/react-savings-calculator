import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import InputForm from "./InputForm";
import OutputForm from "./OutputForm";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3
        }
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit
    }
});

const steps = ["Detail Savings", "Check Potential Savings"];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <InputForm />;
        case 1:
            return <OutputForm state={step} />;
        default:
            throw new Error("Unknown step");
    }
}

class App extends React.Component {
    state = {
        activeStep: 0,
        output: {
            balance: 200,
            savings: 180,
            interest: 20
        }
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
            output: state.output
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            output: state.output
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            output: {
                balance: 0,
                savings: 0,
                interest: 0
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Company name
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <InputForm />
                        <OutputForm />
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
