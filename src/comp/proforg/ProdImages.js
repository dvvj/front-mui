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
    height : "80px",
    border : "1px solid black",
    fontSize: 18,
    textAlign : "center"
  }
});

export default function ProdImages(props) {
  const { imgUrl, prodName } = props;
  const classes = useStyles();
  const dragActiveMsg = '松开鼠标完成【' + prodName + '】图片文件选取';
  const dragInactiveMsg = '上传【' + prodName +'】图片：点击选取或者直接拖拽文件至此';
  const dragRejectMsg = '请选取单个图片文件（png/jpg/jpeg后缀）';


  const onDropFiles = files => {
    console.log('files: ', files);
  }

  return (
    <Card className={classes.card}>

        <CardMedia
          className={classes.media}
          image={imgUrl}
          title={prodName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
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
                    {isDragActive ? dragActiveMsg : dragInactiveMsg}
                    {isDragReject && dragRejectMsg}
                  </div>

              )}
            </Dropzone>
          </Typography>

          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>

      <CardActions>
        {/* <Button size="small" color="primary">更新</Button> */}
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}