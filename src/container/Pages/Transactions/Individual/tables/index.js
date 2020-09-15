import React from "react";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import styles from "../css";
import Melting from "./melting";
import Repayment from "./repayment";
import Extension from "./extension";
import Auction from "./auction";
import Cancle from "./cancle";

class Index extends React.Component {
    render() {
        const {classes} = this.props;

        if (this.props.active == "Pencairan") {
            var ttl = 'Pencairan';
            var subtl = 'pencairan.';
            var tbl = <div>
                <Hidden only={['lg', 'xl']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Melting
                                    width={60}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_disbursements?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Melting
                                    width={285}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_disbursements?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>
        } else if (this.props.active == "Pelunasan") {
            var ttl = 'Pelunasan';
            var subtl = 'pelunasan.';
            var tbl = <div>
                <Hidden only={['lg', 'xl']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Repayment
                                    width={60}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_repayments?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Repayment
                                    width={285}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_repayments?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>

        } else if (this.props.active == "Perpanjangan") {
            var ttl = 'Perpanjangan';
            var subtl = 'perpanjangan.';
            var tbl = <div>
                <Hidden only={['lg', 'xl']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Extension
                                    width={60}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_time_extensions?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Extension
                                    width={285}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_time_extensions?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>

        } else if (this.props.active == "Lelang") {
            var ttl = 'Lelang';
            var subtl = 'lelang.';
            var tbl = <div>
                <Hidden only={['lg', 'xl']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Auction
                                    width={60}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_auctions?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Auction
                                    width={285}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_auctions?type=customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>
        } else if (this.props.active == "Dibatalkan") {
            var ttl = 'Dibatalkan';
            var subtl = 'dibatalkan.';
            var tbl = <div>
                <Hidden only={['lg', 'xl']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Cancle
                                    width={60}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_cancels?customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Cancle
                                    width={285}
                                    open={this.props.open}
                                    filter={false}
                                    title={"Transaksi " + ttl}
                                    subtitle={"Manajemen transaksi " + subtl}
                                    path="transaction_cancels?customer"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>
        }
        return (
            <div>
                {tbl}
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Index"})(Index);
