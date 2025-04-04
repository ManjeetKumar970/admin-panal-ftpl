export interface BannerList {
  id: string;
  name: string;
  file_info: { url: string };
}

export interface BannerFormTypes {
  name: string;
  file_id: string;
  head_description: string;
  sub_description: string;
  btn_link: string;
}