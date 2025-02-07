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
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const pageHeight = scrollHeight - innerHeight;
      const progress = Math.min((scrollY / pageHeight) * 100, 100);
      currentProgress.current = Math.floor(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapter]);
};

export default useScrollParagraph;
