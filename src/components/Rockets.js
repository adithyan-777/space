import React from "react";
import { useQuery } from "react-query";
import fetch from "./fetch";
import { Link } from "react-router-dom";
import {
    Grid,
    Paper,
    Button,
    Container,
    CardActionArea,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: "flex",
        flexDirection: "row",
    },
    media: {
        width: "100%",
        height: "500px",
        objectFit: "contain",
    },
    cont: {
        color: "white",
    },
    head: {
        color: "white",
        component: "h3",
    },
    card: {
        padding: theme.spacing(2),
    },
    single: {
        backgroundColor: "#212121",
        color: "white",
    },
}));

const Rockets = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { status, data } = useQuery("rockets", () =>
        fetch("https://api.spacexdata.com/v4/rockets")
    );
    if (status === "loading") return <p>Loading...</p>;
    if (status === "error") return <p>Error :(</p>; // console.info(data);
    if (status === "success") console.log(data);
    return (
        <Grid container className={classes.root} direction="row">
            <Grid item xs={12}>
                <Typography className={classes.head} variant="h1">
                    Rockets
                </Typography>
            </Grid>

            {data.data.map((rok) => {
                console.log(rok);
                return (
                    <Grid item xs={6} className={classes.card} key={rok.id}>
                        <Card
                            key={rok.id}
                            to={`/rocket/${rok.id}`}
                            className={classes.single}
                        >
                            <CardContent>
                                <Carousel>
                                    {rok.flickr_images.map((img, i) => (
                                        <CardMedia
                                            key={i}
                                            style={{
                                                width: "100%",
                                                height: 400,
                                                objectFit: "cover",
                                            }}
                                            image={img}
                                            alt={rok.name}
                                            onClick={() => {
                                                history.push(
                                                    `/rocket/${rok.id}`
                                                );
                                            }}
                                        />
                                    ))}
                                </Carousel>
                                <CardActionArea
                                    onClick={() => {
                                        history.push(`/rocket/${rok.id}`);
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h4"
                                        color="inherit"
                                    >
                                        {rok.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="inherit"
                                        component="p"
                                    >
                                        {rok.description}
                                    </Typography>
                                </CardActionArea>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};
// function Item(props) {
//     return (
//         <Paper>
//             <img src={props.img} alt="ll" />
//             <Button className="CheckButton">Check it out!</Button>
//         </Paper>
//     );
// }

export default Rockets;
