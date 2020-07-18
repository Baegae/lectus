import React from 'react';
import { useRouter } from 'next/router';

const EditorPage: React.FC = () => {
  const router = useRouter();
  const { lectureId, lessonId } = router.query;
  return (
    <div>
      <h1>Editor</h1>
      lectureId: {lectureId}, lessonId: {lessonId}
    </div>
  );
};

export default EditorPage;
