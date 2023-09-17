import ToggleWatchlistItem from "@/utils/toggleWatchlistItem";
import { Button, Dropdown, Space, message } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import NProgress from "nprogress";
import { setData } from "@/redux/features/watchList";
import { useDispatch } from "react-redux";

const TvCard = ({ tv, setWatchList, watchListSlice }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const handleToggleWatchListItem = async () => {
    try {
      if (!session) {
        router.push("/auth/login");
        return;
      }
      NProgress.start();
      const res = await ToggleWatchlistItem(session?.user?.id, tv);
      dispatch(setData(res));
      setWatchList(res);
      message.success("The transaction was completed successfully");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      NProgress.done();
    }
  };
  const items = [
    {
      label: (
        <div
          onClick={() => handleToggleWatchListItem()}
          className={`flex items-center gap-1 ${
            watchListSlice?.find((i) => i.id === tv?.id)
              ? "text-mainDarkRed"
              : " text-black"
          }`}
        >
          <BsFillBookmarkPlusFill className="text-lg" />
          Watchlist
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <AiFillHeart className="text-lg" />
          Favorites
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <AiFillStar className="text-lg" />
          Your rating
        </div>
      ),
      key: "2",
    },
  ];

  const formattedTitle = tv?.name?.toLowerCase().replace(/ /g, "-");
  return (
    <div className="p-0 flex flex-col gap-2 group overflow-hidden relative  cursor-pointer ">
      <div className="absolute top-2 right-2 z-30">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          className="group-hover:opacity-100 opacity-0  select-none"
        >
          <div onClick={(e) => e.preventDefault()}>
            <Space className="bg-white/80 text-2xl rounded-full  hover:bg-blue-600 duration-300  ">
              <BiDotsHorizontalRounded className="text-black hover:text-white duration-300" />
            </Space>
          </div>
        </Dropdown>
      </div>
      <div
        onClick={() => router.push(`/tv-details/${movie.id}-${formattedTitle}`)}
        className="w-full aspect-[9/14]  relative"
      >
        <Image
          alt={tv?.name}
          className="object-cover object-center w-full h-full rounded-md"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tv?.backdrop_path}`}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tv?.backdrop_path}`}
          loading="lazy"
        ></Image>
      </div>
      <div
        onClick={() => router.push(`/tv-details/${tv.id}-${formattedTitle}`)}
        className="w-full h-full absolute left-0 top-0 opacity-0 group-hover:opacity-100 flex rounded-md bg-black/20 items-center justify-center"
      >
        <Button type="button" className="bg-mainDarkRed text-white">
          See more
        </Button>
      </div>
    </div>
  );
};

export default TvCard;
