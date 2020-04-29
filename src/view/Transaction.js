import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './css/Transaction.css';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title = "",
            tags = [],
        }
    }

    transactionDetail() {
        return (
            
        )
    }

    render() {
        return (
            <Card className="transaction-root">
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
                            Transaction1
                        </Typography>
                        <Typography className="title" color="textSecondary" gutterBottom>
                            CS542 Final Project
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                    <Button size="small">Learn More</Button>
                    </CardActions> */}
                </CardActionArea>
            </Card>
        );
    }
}

export default Transaction;
