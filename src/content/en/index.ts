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

/** Translation of ko/. Korean is the source of truth; fix ko first, then sync here. */
export const en: SiteContent = { profile, platform, cases, principles, aiWorkflow, chapters, stack, leadership, resume };
