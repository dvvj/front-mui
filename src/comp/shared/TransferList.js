import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  let bids = b.map(v => v.product.id);
  return a.filter(value => !bids.includes(value.product.id));
}

function intersection(a, b) {
  let bids = b.map(v => v.product.id);
  console.log('bids:', bids, a, b);
  return a.filter(value => bids.includes(value.product.id));
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function productsIncludes(products, prod) {
  let pids = products.map(v => v.product.id);
  console.log('pids: ', pids);
  return pids.includes(prod.product.id);
}

function productIndexOf(products, prod) {
  let pids = products.map(v => v.product.id);
  console.log('pids: ', pids, prod);
  return pids.indexOf(prod.product.id);
}

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(props.products);
  const [right, setRight] = React.useState([]);

  // const setProducts = products => {
  //   setLeft(products);
  // }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = product => () => {
    const currentIndex = productIndexOf(checked, product);
    console.log('currentIndex: ', currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(product);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log('newChecked: ', newChecked);

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    console.log('in handleCheckedLeft');
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(prod => {
          const product = prod.product;
          const labelId = `transfer-list-all-item-${product.id}-label`;
          return (
            <ListItem key={product.id} role="listitem" button onClick={handleToggle(prod)}>
              <ListItemIcon>
                <Checkbox
                  checked={productsIncludes(checked, prod)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={product.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  );
}