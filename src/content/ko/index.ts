import { SiteContent } from '../../types/content';
import { profile } from './profile';
import { platform } from './platform';
import { cases } from './cases';
import { principles } from './principles';
import { aiWorkflow } from './aiWorkflow';
import { chapters } from './journey';
import { stack } from './stack';
import { leadership } from './leadership';
import { resume } from './resume';

/** 한국어가 원본이다. 문구를 고칠 때는 ko 를 먼저 고치고 en 을 맞춘다. */
export const ko: SiteContent = { profile, platform, cases, principles, aiWorkflow, chapters, stack, leadership, resume };
