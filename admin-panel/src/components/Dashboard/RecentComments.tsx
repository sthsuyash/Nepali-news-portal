import { useComments } from "@/hooks/useComments";
import { MessageSquareText, EllipsisVertical } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  post: { id: string; title: string; slug: string };
  user: { id: string; name: string; email: string; role: { name: string } };
}

const modifyDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "short", 
    day: "numeric", 
    hour: "numeric", 
    minute: "numeric" 
  };
  return new Date(date).toLocaleString("en-US", options);
};


export const RecentComments = () => {
  const page = 1;
  const limit = 5;
  const { comments, loading, error } = useComments(page, limit);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <MessageSquareText /> Recent Comments
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <table className="w-full table-auto">
        <TableHead />
        {loading && (
          <div className="animate-pulse">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-2">
                <div className="w-16 h-4 bg-stone-200 rounded"></div>
                <div className="w-32 h-4 bg-stone-200 rounded"></div>
                <div className="w-24 h-4 bg-stone-200 rounded"></div>
                <div className="w-20 h-4 bg-stone-200 rounded"></div>
                <div className="w-8 h-4 bg-stone-200 rounded"></div>
              </div>
            ))}
          </div>
        )}
        <tbody>
          {comments.length > 0 && (
            comments.map((comment: Comment, index: number) => (
              <TableRow
                key={index}
                id={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                updatedAt={comment.createdAt}
                post={comment.post}
                user={comment.user}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => (
  <thead>
    <tr className="text-xs text-stone-500 text-left">
      <th className="p-1.5">Post</th>
      <th className="p-1.5">Content</th>
      <th className="p-1.5">User</th>
      <th className="p-1.5">Created At</th>
      <th className="p-1.5"></th>
    </tr>
  </thead>
);

const TableRow = ({
  id,
  content,
  createdAt,
  updatedAt,
  post,
  user
}: {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  post: { id: string; title: string; slug: string };
  user: { id: string; name: string; email: string; role: { name: string } };
}) => (
  <tr className="text-sm text-stone-700">
    <td className="p-1.5">{post.title}</td>
    <td className="p-1.5">{content}</td>
    <td className="p-1.5">{user.name}</td>
    <td className="p-1.5">{modifyDate(createdAt)}</td>
    <td className="p-1.5">
      <EllipsisVertical />
    </td>
  </tr>
);

