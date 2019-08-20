import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';

const useStyles = makeStyles({
  card: {
    margin : "10px 10px",
    maxWidth: 300,
  },
  media: {
    height: 300,
  },
  dropzone: {
    width  : "100%",
    height : "60px",
    border : "1px solid black",
    fontSize: 18,
    textAlign : "center"
  }
});

export default function ProdImages(props) {
  const { imgUrl, prodName } = props;
  const classes = useStyles();


  const onDropFiles = files => {
    console.log('files: ', files);
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {prodName}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Dropzone onDrop={onDropFiles}
        accept="image/jpeg,image/png"
        minSize={0}
        maxSize={5242880}
        multiple={false}
      >
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (

            <div {...getRootProps()}
            className={classes.dropzone}>
              <input {...getInputProps()} />
              {isDragActive ? "松开鼠标完成图片文件选取" : '上传产品图片：点击选取图片文件或者直接将图片文件拖拽至此'}
              {isDragReject && '请选取单个图片文件（png/jpg/jpeg后缀）'}
            </div>

        )}
      </Dropzone>
        {/* <Button size="small" color="primary">更新</Button> */}
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}