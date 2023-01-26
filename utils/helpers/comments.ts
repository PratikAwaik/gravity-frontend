import { IComment } from "../../models/comment";

export function insertChildInTrees(
  comments: IComment[],
  parentId: string,
  commentToAdd: IComment
) {
  for (const comment of comments) {
    insertChild(comment, parentId, commentToAdd);
  }
}

export function insertChild(
  comment: IComment,
  parentId: string,
  commentToAdd: IComment
) {
  if (comment.id === parentId) {
    comment.children.push(commentToAdd);
  }
  for (const child of comment.children) {
    insertChild(child, parentId, commentToAdd);
  }
}

export function updateChildInTrees(
  comments: IComment[],
  updatedComment: IComment,
  isCommentDeleted: boolean,
  isContentUpdated: boolean
) {
  for (const comment of comments) {
    updateChild(comment, updatedComment, isCommentDeleted, isContentUpdated);
  }
}

export function updateChild(
  comment: IComment,
  updatedComment: IComment,
  isCommentDeleted: boolean,
  isContentUpdated: boolean
) {
  if (comment.id === updatedComment.id) {
    if (isCommentDeleted) {
      comment.deleted = true;
    } else if (isContentUpdated) {
      comment.content = updatedComment.content;
      comment.updatedAt = updatedComment.updatedAt;
    }
  }
  for (const child of comment.children) {
    updateChild(child, updatedComment, isCommentDeleted, isContentUpdated);
  }
}

export const scrollWithOffset = (
  el: HTMLElement,
  behavior: "smooth" | "auto" = "smooth"
) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -180;
  window.scrollTo({ top: yCoordinate + yOffset, behavior });
};
