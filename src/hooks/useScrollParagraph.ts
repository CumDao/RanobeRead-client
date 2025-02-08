import { RefObject, useEffect } from 'react';
import { ChapterResponce } from '../types/chapter';

interface UseScrollParagraphProps {
  currentProgress: RefObject<number | null>;
  chapter: ChapterResponce | null;
}

const useScrollParagraph = ({ currentProgress, chapter }: UseScrollParagraphProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        document.body.scrollHeight - window.innerHeight,
      );
      const progress = (scrollY / maxScroll) * 100;
      currentProgress.current = Math.floor(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapter]);
};

export default useScrollParagraph;
