import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { Scatter } from "react-chartjs-2";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const mapStateToProps = state => {
    var chartPoints = state.amortization.map(item => ({
        x: item.date,
        y: item.balance
    }));
    return {
        data: {
            formData: [
                { name: "Final Balance", amount: "$" + state.totalSavings },
                {
                    name: "Interest Earnt",
                    amount: "$" + state.totalInterest
                }
            ],
            chartPoints: chartPoints
        }
    };
};

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`
    },
    total: {
        fontWeight: "700"
    },
    title: {
        marginTop: theme.spacing.unit * 2
    }
});

function OutputForm(props) {
    const { classes, data } = props;
    const chartOptions = {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return (
                        new Date(tooltipItem.xLabel).toLocaleDateString() +
                        ": $" +
                        Math.round(tooltipItem.yLabel * 100) / 100
                    );
                }
            }
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        callback: function(value, index, labels) {
                            return new Date(value).toLocaleDateString();
                        }
                    }
                }
            ]
        }
    };
    var chartData = {
        labels: ["Scatter"],
        datasets: [
            {
                label: "My Savings",
                fill: true,
                steppedLine: false,
                backgroundColor: red[400],
                borderColor: red[700],
                pointBorderColor: red[900],
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderColor: grey[900],
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                showLine: true,
                data: data.chartPoints
            }
        ]
    };

    return (
        <React.Fragment>
            <Scatter data={chartData} options={chartOptions} />

            <Typography variant="h6" gutterBottom>
                My Savings
            </Typography>

            <List disablePadding>
                {data.formData.map(output => (
                    <ListItem className={classes.listItem} key={output.name}>
                        <ListItemText primary={output.name} />
                        <Typography variant="body1">{output.amount}</Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}

OutputForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(OutputForm));
