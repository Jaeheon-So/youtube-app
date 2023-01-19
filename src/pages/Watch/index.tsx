import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getComments, getRelated, getVideoDetail } from "../../api/api";
import Comments from "../../components/Comments";
import Description from "../../components/Description";
import MainVideo from "../../components/MainVideo";
import RelatedVideo from "../../components/RelatedVideo";

interface WatchProps {
  open: boolean;
}

const Watch = ({ open }: WatchProps) => {
  // type assertion
  const { id } = useParams() as { id: string };
  const [videoDetailData, setVideoDetailData] = useState();
  const [comments, setComments] = useState();
  const [isError, setIsError] = useState("");
  const [relatedData, setRelatedData] = useState();


  useEffect(() => {
    const data = axios.all([
      getVideoDetail(id, setVideoDetailData, setIsError),
      getComments(id, setComments, setIsError),
      getRelated(id, setRelatedData, setIsError)
    ]);
  }, [id]);

  return (
    <WatchContainer open={open}>
      <WatchPageWrapper>
        <MainVideo videoId={id} />
        <Description channelId="UCwQLh1dMRrT4WRjNKYzGHcw" />
        <Comments videoId={id} />
      </WatchPageWrapper>
      <RelatedVideo relatedData={relatedData}/>
    </WatchContainer>
  );
};

const WatchPageWrapper = styled.div`
  max-width: 1000px;
  min-width: 500px;
  margin-right: 40px;
`;
const WatchContainer = styled.div<{ open: boolean }>`
  display: flex;
  padding: 5rem 3.5rem;
  margin-left: ${(props) => (props.open ? "240" : "0")}px;
  justify-content: center;
`;

export default Watch;
