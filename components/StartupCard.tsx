import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
//accept the props

//instead of post. anything lets destructure the data at the start
const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {_createdAt, views, author: {_id:authorId, name}, title, category, _id, description,image} = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line_clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          {/* need to configue the palcehold.co <Image> component doesn’t allow external images unless you explicitly allow their domains in next.config.js.   */}
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup_card_desc">
            {description}
        </p>
        <Image
          src={image}
          alt="startup image"
          width={600}
          height={320}
          className="startup-card_img"
          unoptimized
        />
        {/* Replace the plain <img> tag with Next.js' <Image /> component (falling back to a placeholder when image is missing) to satisfy the lint rule. */}
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          {/* update the query of url based on category of post  */}
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup_card_btn" asChild>
          {/* asChild bcz of the link in it */}
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </Button>
        {/* shadcn button */}
      </div>

    </li>
  );
};

export default StartupCard;
