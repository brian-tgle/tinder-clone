import { FC, useState } from 'react';
import { ReactComponent as NextButton } from 'assets/images/next.svg';
import { ReactComponent as BackButton } from 'assets/images/back.svg';
import './slideShow.scss';

interface SlideShowProps {
  images: string[];
  userFullname: string;
  age: number;
  title: string;
}

const SlideShow: FC<SlideShowProps> = ({ images, userFullname, age, title }) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const handleChangeSlideIndex = (number: number): void => {
    setSlideIndex((prevIndex) => prevIndex + number);
  };
  return (
    <div
      className="slide-show with-border-radius with-shadow"
      style={{ backgroundImage: `url(${images[slideIndex]})` }}>
      <div className="text-center total-images">{`${slideIndex + 1} of ${images.length}`}</div>
      <div className="change-image-actions">
        {!slideIndex ? <button className="no-border no-bg" onClick={() => handleChangeSlideIndex(-1)}>
          <BackButton />
        </button> : <></>}
        {slideIndex === images.length - 1 ?
          <button className="no-border no-bg" onClick={() => handleChangeSlideIndex(1)}>
            <NextButton />
          </button> : <></>}
      </div>
      <h1 className="name">{userFullname}</h1>
      <h2 className="title">{title}</h2>
      <p className="age">{age}</p>
    </div>
  );
};

export default SlideShow;
